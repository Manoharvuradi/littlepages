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
      // ❌ Don't just warn and return - throw an error
      throw new Error(
        '❌ Razorpay API keys are missing. Please set RAZORPAY_TEST_API_KEY and RAZORPAY_TEST_SECRET_KEY environment variables.'
      );
    }

    this.razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    console.log('✅ Razorpay initialized successfully');
  }

  getClient() {
    if (!this.razorpay) {
      throw new Error('Razorpay not initialized');
    }
    return this.razorpay;
  }

  async createOrder(userId: number, amount: number) {
    // ✅ Add safety check
    if (!this.razorpay) {
      throw new BadRequestException('Payment service is not available. Please contact support.');
    }

    try {
      const order = await this.razorpay.orders.create({
        amount: amount * 100,
        currency: 'INR',
      });

    
      // Store temporary payment record with Razorpay order ID
      await this.prisma.payment.create({
        data: {
          razorpayOrderId: order.id,
          amount,
          currency: "INR",
          status: "PENDING",
          user: { connect: { id: userId } },
        },
      });
    
      return order;
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      throw new BadRequestException('Failed to create payment order');
    }
  }

  async verifyPayment(userId: number, body: any) {
    try {
      if (!this.razorpay) {
        throw new BadRequestException('Payment service is not available');
      }
  
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body.response;
      const { total, quantity, bookId, bookTitle, coverPagePicture } = body.req || {};
      
  
      // ✅ Validate required fields
      if (!total || !quantity || !bookId) {
        throw new BadRequestException('Missing required fields: total, quantity, or bookId');
      }
  
      const sign = razorpay_order_id + '|' + razorpay_payment_id;
      const expectedSign = crypto
        .createHmac('sha256', process.env.RAZORPAY_TEST_SECRET_KEY!)
        .update(sign)
        .digest('hex');
  
      if (expectedSign !== razorpay_signature) {
        throw new BadRequestException('Invalid payment signature');
      }
  
      // Rest of your code...
      const shippingAddress = await this.prisma.address.findFirst({
        where: { userId },
        select: { id: true },
      });
  
      const billingAddress = await this.prisma.address.findFirst({
        where: { userId },
        select: { id: true },
      });
  
      if (!shippingAddress || !billingAddress) {
        throw new BadRequestException('Shipping or billing address not found');
      }
  
      const user = await this.prisma.users.findUnique({
        where: { id: userId },
        select: { email: true },
      });
  
      const totalAmount = parseFloat(total);
      const orderQuantity = parseInt(quantity);
      const pricePerBook = totalAmount / orderQuantity;
  
      if (isNaN(totalAmount) || isNaN(orderQuantity)) {
        throw new BadRequestException('Invalid amount or quantity');
      }
  
      const dbOrder = await this.prisma.order.create({
        data: {
          email: user?.email || '',
          subtotal: totalAmount,
          total: totalAmount,
          shipping: 0,
          tax: 0,
          discount: 0,
          orderNumber: `ORD-${Date.now()}`,
          status: 'CONFIRMED',
          shippingMethod: "Standard",
          estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          
          user: { connect: { id: userId } },
          shippingAddress: { connect: { id: shippingAddress.id } },
          billingAddress: { connect: { id: billingAddress.id } },
          book: { connect: { id: parseInt(bookId) } },
          
          items: {
            create: {
              name: bookTitle,
              image: coverPagePicture,
              price: pricePerBook,
              quantity: orderQuantity,
              book: { connect: { id: parseInt(bookId) } }
            }
          },
        },
      });
  
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
  
    } catch (error) {
      console.error('❌ Payment verification error:', error);
      throw error; // NestJS will handle this and return proper error response
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