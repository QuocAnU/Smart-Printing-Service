import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json());
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  app.enableCors({
    allowedHeaders: ['content-type', 'Authorization'],
    // origin: 'http://localhost:3000',
    origin: [
      'http://localhost:3000',
      'http://localhost:3000/prepare',
      'http://localhost:3000/listprinter',
    ], 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  // app.enableCors();
  await app.listen(8001);
}
bootstrap();
