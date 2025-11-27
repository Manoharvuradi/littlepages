import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';

@Injectable()
export class OrderstatushistoryService {
    constructor() {}

    async createOrderStatusHistory(orderStatusHistoryData: Prisma.OrderStatusHistoryCreateInput) {
        return {
            message: 'Order status history created successfully',
            data: orderStatusHistoryData,
        };
    }
}
