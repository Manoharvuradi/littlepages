import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser()); // this makes req.cookies available
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', // your frontend URL
    credentials: true,
  });
  const port = process.env.PORT || 3001;
  await app.listen(port);
}
bootstrap();
