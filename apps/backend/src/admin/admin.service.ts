import { Injectable, NotFoundException } from '@nestjs/common';
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

async getDashboardStats() {
    // Parallel execution for better performance
    const [
      totalOrders,
      totalRevenueData,
      pendingOrders,
      completedOrders,
      recentOrders,
    ] = await Promise.all([
      // Total orders count
      this.prisma.order.count(),

      // Total revenue
      this.prisma.order.aggregate({
        _sum: {
          total: true,
        },
      }),

      // Pending orders (CONFIRMED + PROCESSING)
      this.prisma.order.count({
        where: {
          status: {
            in: ['CONFIRMED', 'PROCESSING'] as OrderStatus[],
          },
        },
      }),

      // Completed orders
      this.prisma.order.count({
        where: {
          status: 'DELIVERED' as OrderStatus,
        },
      }),

      // Recent orders (last 10)
      this.prisma.order.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
          shippingAddress: true,
          billingAddress: true,
          items: true,
        },
      }),
    ]);

    return {
      totalOrders,
      totalRevenue: totalRevenueData._sum.total || 0,
      pendingOrders,
      completedOrders,
      recentOrders: recentOrders.map(order => ({
        id: order.id,
        orderNumber: order.orderNumber,
        customerName: order.user?.name || 'Guest',
        email: order.email,
        status: order.status,
        total: order.total,
        createdAt: order.createdAt,
        shippingAddress: order.shippingAddress,
        billingAddress: order.billingAddress,
        items: order.items,
      })),
    };

  }

  async getOrder(id: string) {
  const order = await this.prisma.order.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      shippingAddress: true,
      billingAddress: true,
      items: {
        include: {
          book: {
            select: {
              id: true,
              bookTitle: true,
            },
          },
        },
      },
      payments: {
        orderBy: {
          createdAt: 'desc',
        },
      },
      statusHistory: {
        orderBy: {
          createdAt: 'desc',
        },
      },
      book: {
        select: {
          id: true,
          bookTitle: true,
          bookSize: true,
        },
      },
    },
  });

  if (!order) {
    throw new NotFoundException(`Order with ID ${id} not found`);
  }

  return {
    id: order.id,
    orderNumber: order.orderNumber,
    customerName: order.user?.name || 'Guest',
    email: order.email,
    status: order.status,
    subtotal: order.subtotal,
    shipping: order.shipping,
    tax: order.tax,
    discount: order.discount,
    total: order.total,
    shippingMethod: order.shippingMethod,
    trackingNumber: order.trackingNumber,
    trackingUrl: order.trackingUrl,
    estimatedDelivery: order.estimatedDelivery,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    shippingAddress: order.shippingAddress,
    billingAddress: order.billingAddress,
    items: order.items.map(item => ({
      id: item.id,
      name: item.name,
      image: item.image,
      quantity: item.quantity,
      price: item.price,
      book: item.book,
    })),
    payments: order.payments.map(payment => ({
      id: payment.id,
      amount: payment.amount,
      status: payment.status,
      razorpayPaymentId: payment.razorpayPaymentId,
      razorpayOrderId: payment.razorpayOrderId,
      createdAt: payment.createdAt,
    })),
    statusHistory: order.statusHistory,
    book: order.book,
    user: order.user,
  };
}

async updateOrderStatus(id: string, status: OrderStatus, note?: string) {
  // Check if order exists
  const order = await this.prisma.order.findUnique({
    where: { id },
  });

  if (!order) {
    throw new NotFoundException(`Order with ID ${id} not found`);
  }

  // Update order status
  const updatedOrder = await this.prisma.order.update({
    where: { id },
    data: {
      status,
      updatedAt: new Date(),
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  // Create status history entry
  await this.prisma.orderStatusHistory.create({
    data: {
      orderId: id,
      status,
      description: note || `Status changed to ${status}`,
      // createdBy: 'Admin', // You can pass admin user info here
    },
  });

  return {
    id: updatedOrder.id,
    orderNumber: updatedOrder.orderNumber,
    status: updatedOrder.status,
    customerName: updatedOrder.user?.name || 'Guest',
    email: updatedOrder.email,
    total: updatedOrder.total,
    updatedAt: updatedOrder.updatedAt,
  };
}
}
