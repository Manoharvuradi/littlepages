import { Body, Controller, Headers, Post, Req, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create-order')
  async createOrder(
    @Req() req,
    @Body() body: { amount: number }
  ) {
    try{
      console.log("Create order called with body:", body, "and user:", req.user);
      return this.paymentService.createOrder(req.user.sub, body.amount);
    }catch(e){
      console.log("Error in createOrder:", e);
      console.log(e);
    }
  }

  @Post('verify')
  async verify(@Req() req,@Body() body: any) {
    return this.paymentService.verifyPayment(req.user.sub, body);
  }

  @Post('webhook')
  async webhook(
    @Req() req,
    @Headers('x-razorpay-signature') signature: string
  ) {
    return this.paymentService.handleWebhook(req.body, signature);
  }
}