import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { jwtConstants } from './constants';
import { JwtAuthGuard } from './jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [UsersModule,
    JwtModule.register({
      global: true,
      // secret: process.env.JWT_SECRET || 'your_jwt_secret', // Use env var in production!
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    PrismaModule,
  ],
  providers: [
  AuthService,
  {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },
],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
