import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ImagesModule } from './images/images.module';
import { UsersModule } from './users/users.module';
import { BookModule } from './book/book.module';
import { BookimageModule } from './bookimage/bookimage.module';

@Module({
  imports: [AuthModule, ImagesModule, UsersModule, BookModule, BookimageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
