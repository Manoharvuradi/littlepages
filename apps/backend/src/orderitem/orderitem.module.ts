import { Module } from '@nestjs/common';
import { OrderitemService } from './orderitem.service';
import { OrderitemController } from './orderitem.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [OrderitemService, PrismaService],
  controllers: [OrderitemController]
})
export class OrderitemModule {}
