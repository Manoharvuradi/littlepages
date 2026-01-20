import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

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
