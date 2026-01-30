import { Injectable, BadRequestException } from '@nestjs/common';
import Razorpay from 'razorpay';
import * as crypto from 'crypto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PaymentService {
  private razorpay: Razorpay;

  constructor(private prisma: PrismaService) {
    const keyId = process.env.RAZORPAY_TEST_API_KEY;
    const keySecret = process.env.RAZORPAY_TEST_SECRET_KEY;

    if (!keyId || !keySecret) {
      console.warn('⚠️ Razorpay keys not found. Payments disabled.');
      return;
    }

    this.razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
  }

  getClient() {
    if (!this.razorpay) {
      throw new Error('Razorpay not initialized');
    }
    return this.razorpay;
  }

async createOrder(userId: number, amount: number) {
  // Only create Razorpay order, NOT database order
  try{

    const order = await this.razorpay.orders.create({
      amount: amount * 100,
      currency: 'INR',
    });

    console.log('Razorpay order created:', order);
  
    // Store temporary payment record with Razorpay order ID
    await this.prisma.payment.create({
      data: {
        razorpayOrderId: order.id,
        amount,
        currency: "INR",
        status: "PENDING",
        user: { connect: { id: userId } },
        // No order connection yet - will connect after payment success
      },
    });
  
    return order;
  }catch(error){
    console.error('Error creating Razorpay order:', error);
    throw error;
  }
}

async verifyPayment(userId: number, body: any) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body.response;
  const { amount } = body;

  const sign = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSign = crypto
    .createHmac('sha256', process.env.RAZORPAY_TEST_SECRET_KEY!)
    .update(sign)
    .digest('hex');

  if (expectedSign !== razorpay_signature) {
    throw new BadRequestException('Invalid payment signature');
  }else{

  // Payment verified successfully - NOW create the order
  const shippingAddressId = await this.prisma.address.findFirst({
    where: { userId },
    select: { id: true },
  }).then(addr => addr?.id);

  const billingAddressId = await this.prisma.address.findFirst({
    where: { userId },
    select: { id: true },
  }).then(addr => addr?.id);

  if (!shippingAddressId || !billingAddressId) {
    throw new BadRequestException('Shipping or billing address not found');
  }

  // Get user email
  const user = await this.prisma.users.findUnique({
    where: { id: userId },
    select: { email: true },
  });

  // Create order in database AFTER payment success
  const dbOrder = await this.prisma.order.create({
    data: {
      userId,
      email: user?.email || '',
      subtotal: amount,
      total: amount,
      shipping: 0,
      tax: 0,
      shippingAddressId: shippingAddressId.toString(),
      billingAddressId: billingAddressId.toString(),
      orderNumber: `ORD-${Date.now()}`,
      status: 'CONFIRMED', // Set as CONFIRMED since payment is successful
      shippingMethod: "Standard",
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    },
  });

  // Update payment record with order connection and success status
  await this.prisma.payment.update({
    where: { razorpayOrderId: razorpay_order_id },
    data: {
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      status: 'SUCCESS',
      order: { connect: { id: dbOrder.id } },
    },
  });

  return { 
    status: 'success', 
    paymentId: razorpay_payment_id, 
    orderId: dbOrder.id,
    orderNumber: dbOrder.orderNumber 
  };
  }
}

  async handleWebhook(req: any, signature: string) {
    const expected = crypto
      .createHmac('sha256', process.env.RAZORPAY_TEST_SECRET_KEY!)
      .update(JSON.stringify(req))
      .digest('hex');

    if (expected !== signature) {
      throw new BadRequestException('Webhook signature mismatch');
    }

    // Handle payment events
    if (req.event === 'payment.failed') {
      await this.prisma.payment.updateMany({
        where: { razorpayPaymentId: req.payload.payment.entity.id },
        data: { status: 'FAILED' },
      });
    }

    return { received: true };
  }
}