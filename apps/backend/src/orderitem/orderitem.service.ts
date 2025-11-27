import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrderitemService {
    constructor(private prisma: PrismaService) { }

    async createOrderItem(orderItemData: Prisma.OrderItemCreateInput) {
        return this.prisma.orderItem.create({
            data: orderItemData,
        });
    }
}
