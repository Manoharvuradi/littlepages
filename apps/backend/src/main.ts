import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { AllExceptionsFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    // Global exception filter
  app.useGlobalFilters(new AllExceptionsFilter());
  app.use(cookieParser());

  app.enableCors({
    origin: [
      process.env.FRONTEND_URL || 'http://localhost:3000',
      'http://localhost:4000'
    ],
    credentials: true,
  });

  const port = process.env.PORT!;
  await app.listen(port);
}
bootstrap();