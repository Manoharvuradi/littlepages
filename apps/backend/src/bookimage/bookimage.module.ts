import { Module } from '@nestjs/common';
import { BookimageService } from './bookimage.service';
import { BookimageController } from './bookimage.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [BookimageService, PrismaService],
  controllers: [BookimageController]
})
export class BookimageModule {}
