import { Module } from '@nestjs/common';
import { OrderstatushistoryService } from './orderstatushistory.service';
import { OrderstatushistoryController } from './orderstatushistory.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [OrderstatushistoryService, PrismaService],
  controllers: [OrderstatushistoryController]
})
export class OrderstatushistoryModule {}
