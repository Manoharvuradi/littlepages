import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [ImagesService, PrismaService],
  controllers: [ImagesController],
})
export class ImagesModule {}
