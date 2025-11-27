import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrderService {
    constructor(private prisma: PrismaService) {}

    async createOrder(orderData: Prisma.OrderCreateInput) {
        return this.prisma.order.create({
            data: orderData,
        });
    }
}
