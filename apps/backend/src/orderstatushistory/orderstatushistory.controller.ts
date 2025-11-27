import { Body, Controller, Post } from '@nestjs/common';
import { OrderstatushistoryService } from './orderstatushistory.service';
import { Prisma } from '@prisma/client';

@Controller('orderstatushistory')
export class OrderstatushistoryController {
    constructor(private readonly orderstatushistoryService: OrderstatushistoryService) {}

    @Post('create')
    async createOrderStatusHistory(@Body() orderStatusHistoryData: Prisma.OrderStatusHistoryCreateInput | any) {
        return this.orderstatushistoryService.createOrderStatusHistory(orderStatusHistoryData);
    }
}
