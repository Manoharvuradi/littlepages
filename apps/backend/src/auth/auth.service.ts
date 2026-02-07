import { Get, Injectable, NotFoundException, Res, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

async signup(
  email: string,
  password: string,
  name?: string,
  role?: string
) {
  const hashed = await bcrypt.hash(password, 10);

  const safeRole =
    role === 'ADMIN' ? Role.ADMIN : Role.USER;

  return this.prisma.users.create({
    data: {
      email,
      password: hashed,
      name,
      role: safeRole,
    },
  });
}

async login(email: string, pass: string) {
  const user = await this.usersService.findOne(email);
  if (!user) throw new UnauthorizedException('Invalid credentials');

  const valid = await bcrypt.compare(pass, user.password);
  if (!valid) throw new UnauthorizedException('Invalid credentials');

  const payload = { sub: user.id, email: user.email };

  return {
    access_token: await this.jwtService.signAsync(payload),
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  };
}

  async findAllUsers() {
    return this.prisma.users.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });
  }

  async showUserBooks(userId: number) {
    const userWithBooks = await this.prisma.users.findUnique({
      where: { id: userId },
      include: {
        Book: true
      }
    });

    return userWithBooks?.Book || [];
  }

  async findCustomerById(id: number) {
    const customer = await this.prisma.users.findUnique({
      where: { id },
      include: {
        orders: {
          include: {
            items: true,
            shippingAddress: true,
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    const totalSpent = customer.orders.reduce((sum, order) => sum + order.total, 0);
    const averageOrderValue = customer.orders.length > 0 ? totalSpent / customer.orders.length : 0;
    const lastOrder = customer.orders[0];

    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      // phone: customer.phone,
      totalOrders: customer.orders.length,
      totalSpent,
      averageOrderValue,
      createdAt: customer.createdAt,
      lastOrderDate: lastOrder?.createdAt,
      orders: customer.orders,
      defaultShippingAddress: lastOrder?.shippingAddress,
    };
  }



}