import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  const options = new DocumentBuilder()
  .setTitle('Startwork api')
  .setDescription('Startwork api')
  .setVersion('1.0.0')
  .addBearerAuth(
    {type:"http",scheme:"bearer",bearerFormat:"Token"},"access-token"
    )
  .build();
const document = SwaggerModule.createDocument(app, options);
SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
