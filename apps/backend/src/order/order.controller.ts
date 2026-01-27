import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { Prisma } from '@prisma/client';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post('create')
    async createOrder(@Body() orderData: Prisma.OrderCreateInput | any) {
        return this.orderService.createOrder(orderData);
    }

    @Get('fetchAllOrders/:userId')
    async fetchAllOrders(@Param('userId') userId: number) {
        return this.orderService.fetchAllOrders(userId);
    }
}
