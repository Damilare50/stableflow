import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'node-config-ts';
import { ValidationPipe } from '@nestjs/common';
import { Helper } from './helper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // input validation
  app.useGlobalPipes(new ValidationPipe(Helper.getValidationPipeOptions()));

  // cors
  app.enableCors();

  await app.listen(parseInt(config.APP_PORT));
}
bootstrap();
