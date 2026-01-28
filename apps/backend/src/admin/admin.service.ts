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

async exportOrders(params: {
  status?: OrderStatus;
  fromDate?: string;
  toDate?: string;
}) {
  const { status, fromDate, toDate } = params;

  const where: any = {};

  if (status) where.status = status;

  if (fromDate || toDate) {
    where.createdAt = {};
    if (fromDate) where.createdAt.gte = new Date(fromDate);
    if (toDate) where.createdAt.lte = new Date(toDate);
  }

  const orders = await this.prisma.order.findMany({
    where,
    include: {
      user: {
        select: { name: true, email: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const header = [
    'Order Number',
    'Customer Name',
    'Email',
    'Status',
    'Total',
    'Created At',
  ];

  const rows = orders.map(o => [
    o.orderNumber,
    o.user?.name ?? '',
    o.email,
    o.status,
    o.total.toFixed(2),
    o.createdAt.toISOString(),
  ]);

  return [header, ...rows].map(r => r.join(',')).join('\n');
}

async getAllCustomers(params: {
  search?: string;
  page: number;
  limit: number;
}) {
  const { search, page, limit } = params;
  const skip = (page - 1) * limit;

  const where: any = {
    role: 'USER',
  };

  if (search) {
    where.OR = [
      { email: { contains: search, mode: 'insensitive' } },
      { name: { contains: search, mode: 'insensitive' } },
    ];
  }

  const [users, total] = await Promise.all([
    this.prisma.users.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        orders: {
          select: {
            total: true,
          },
        },
      },
    }),
    this.prisma.users.count({ where }),
  ]);

  const customers = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    totalOrders: user.orders.length,
    totalSpent: user.orders.reduce((sum, o) => sum + o.total, 0),
    createdAt: user.createdAt,
  }));

  return {
    data: customers,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}
}
