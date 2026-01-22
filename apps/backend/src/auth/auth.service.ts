import { Get, Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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

  async signup(email: string, password: string, name?: string) {
    const hashed = await bcrypt.hash(password, 10);
    return this.prisma.users.create({
      data: { email, password: hashed, name },
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
    // console.log("userId: ", userId);
    const userWithBooks = await this.prisma.users.findUnique({
      where: { id: userId },
      include: {
        Book: true
      }
    });

    return userWithBooks?.Book || [];
  }
}