import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
const PORT = process.env.PORT ?? 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.get(AppModule).configureSwagger(app); 
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform:true
  }));
  await app.listen(PORT)
  console.log(`Application running on PORT ${PORT}`)
}
bootstrap();
