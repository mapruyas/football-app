import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import { config } from './config';
import "reflect-metadata";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(config.app.port);
}
bootstrap();
