import { Body, Controller, Post } from '@nestjs/common';
import { OrderitemService } from './orderitem.service';
import { Prisma } from 'generated/prisma';

@Controller('orderitem')
export class OrderitemController {
    constructor(private readonly orderitemService: OrderitemService) {}

    @Post('create')
    async createOrderItem(@Body() orderItemData: Prisma.OrderItemCreateInput | any) {
        return this.orderitemService.createOrderItem(orderItemData);
    }
}
