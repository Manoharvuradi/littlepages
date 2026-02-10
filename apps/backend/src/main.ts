import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { AllExceptionsFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    // Global exception filter
  app.useGlobalFilters(new AllExceptionsFilter());
  app.use(cookieParser());

  console.log("Frontend URL:", process.env.FRONTEND_URL);
  app.enableCors({
    origin: [
      process.env.FRONTEND_URL
    ],
    credentials: true,
  });

  const port = process.env.PORT!;
  await app.listen(port);
}
bootstrap();