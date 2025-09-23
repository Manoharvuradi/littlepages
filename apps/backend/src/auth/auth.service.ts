import { Get, Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService, 
    private jwtService: JwtService,
  ) {}

  async signup(email: string, password: string, name?: string) {
    const hashed = await bcrypt.hash(password, 10);
    return this.prisma.users.create({
      data: { email, password: hashed, name },
    });
  }

  async login(email: string, password: string) {
    const user = await this.prisma.users.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user;

    // Create JWT payload
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return {
      user: userWithoutPassword,
      token,
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
}