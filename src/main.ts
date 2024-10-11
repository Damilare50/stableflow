import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'node-config-ts';
import { ValidationPipe } from '@nestjs/common';
import { Helper } from './helper';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // input validation
  app.useGlobalPipes(new ValidationPipe(Helper.getValidationPipeOptions()));

  // cors
  app.enableCors();

  // api documentation
  const swaggerConfig = new DocumentBuilder()
    .setTitle('stableflow API')
    .setDescription('stableflow API')
    .setVersion('0.0.1')
    .addTag('profile')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(parseInt(config.APP_PORT));
}
bootstrap();
