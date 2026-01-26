import { Injectable } from '@nestjs/common';
import { OrderStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AdminService {
    constructor(private prisma: PrismaService) {}

    async getOrders(params: {
  status?: OrderStatus;
  search?: string;
  fromDate?: string;
  toDate?: string;
}) {
  const { status, search, fromDate, toDate } = params;

  const where: any = {};

  if (status) {
    where.status = status;
  }

  if (search) {
    where.OR = [
      { orderNumber: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
      {
        user: {
          name: { contains: search, mode: 'insensitive' },
        },
      },
    ];
  }

  if (fromDate || toDate) {
    where.createdAt = {};
    if (fromDate) where.createdAt.gte = new Date(fromDate);
    if (toDate) where.createdAt.lte = new Date(toDate);
  }

  const orders = await this.prisma.order.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
  return {
    orders: orders.map(order => ({
      id: order.id,
      orderNumber: order.orderNumber,
      customerName: order.user?.name ?? '—',
      email: order.email,
      status: order.status,
      total: order.total,
      createdAt: order.createdAt,
    })),
  };
}
}
