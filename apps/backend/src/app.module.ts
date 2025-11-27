import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ImagesModule } from './images/images.module';
import { UsersModule } from './users/users.module';
import { BookModule } from './book/book.module';
import { BookimageModule } from './bookimage/bookimage.module';
import { OrderModule } from './order/order.module';
import { OrderitemModule } from './orderitem/orderitem.module';
import { OrderstatushistoryModule } from './orderstatushistory/orderstatushistory.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [AuthModule, ImagesModule, UsersModule, BookModule, BookimageModule, OrderModule, OrderitemModule, OrderstatushistoryModule, AddressModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
