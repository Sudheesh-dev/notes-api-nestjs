import { Injectable } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common/interfaces';

@Injectable()
export class SwaggerService {
  configureSwagger(app: INestApplication): void {
    const config = new DocumentBuilder()
    .setTitle('Notes Application Backend')
    .setDescription('')
    .setVersion('1.0')
    .addTag('')
    .addBearerAuth()
    .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(process.env.API_DOCS_PATH, app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        }
    });
  }
}