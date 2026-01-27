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
    const order = await this.razorpay.orders.create({
      amount: amount * 100,
      currency: 'INR',
    });

    // console.log('Creating order in DB for user:', order);

    const shippingAddressId = await this.prisma.address.findFirst({
      where: { userId },
      select: { id: true },
    }).then(addr => addr?.id || 1);

    // console.log('Shipping Address ID:', shippingAddressId);

    const billingAddressId = await this.prisma.address.findFirst({
      where: { userId },
      select: { id: true },
    }).then(addr => addr?.id || 1);

    // console.log('Billing Address ID:', billingAddressId);

    const dbOrder = await this.prisma.order.create({
      data: {
        userId,
        email: '',
        subtotal: amount,
        total: amount,
        shipping: 0,
        tax: 0,
        shippingAddressId: shippingAddressId.toString(),
        billingAddressId: billingAddressId.toString(),
        orderNumber: `ORD-${Date.now()}`,
        status: 'PENDING',
        shippingMethod: "Standard",
        estimatedDelivery: new Date(),
      },
    });

    // console.log('Order created in DB:', dbOrder);

    await this.prisma.payment.create({
        data: {
        razorpayOrderId: order.id,
        amount,
        currency: "INR",
        status: "PENDING",

        user: { connect: { id: userId } },
        order: { connect: { id: dbOrder.id } },
      },
    });

    // await this.prisma.payment.create({
    //   data: {
    //     userId,
    //     orderId: order.id,
    //     razorpayOrderId: order.id,
    //     amount,
    //     currency: 'INR',
    //     status: 'PENDING',
    //     user: { connect: { id: userId } },
    //     order: { connect: { id: order.id } },
    //   },
    // });
    console.log('Razorpay order created:', order);
    return order;
  }

  async verifyPayment(body: any) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_TEST_SECRET_KEY!)
      .update(sign)
      .digest('hex');

    if (expectedSign !== razorpay_signature) {
      throw new BadRequestException('Invalid payment signature');
    }else{
      await this.prisma.payment.update({
        where: { razorpayOrderId: razorpay_order_id },
        data: {
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          status: 'SUCCESS',
        },
      });
      return { status: 'success', paymentId: razorpay_payment_id, orderId: razorpay_order_id };
    }

    

    // return { status: 'success' };
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