import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DEFAULT_NODE_ENV, TYPEORM_DB_TYPES } from './modules/common/constants/constants';
import { UsersModule } from './modules/users/users.module';
import { NotesModule } from './modules/notes/notes.module';
import { SwaggerService } from './modules/common/services/swagger.service';
import { AuthModule } from './modules/auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataWrapperInterceptor } from './modules/common/interceptors/data-wrapper.interceptor';
import { CommonModule } from './modules/common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `src/config/${process.env.NODE_ENV ?? DEFAULT_NODE_ENV}.env`,
      isGlobal:true
    }),
    TypeOrmModule.forRoot({
      type: TYPEORM_DB_TYPES.POSTGRES,
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [],
      synchronize: true,
      autoLoadEntities:true,
    }),
    AuthModule,
    UsersModule,
    NotesModule,
    CommonModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: DataWrapperInterceptor,
    },
  ],
  exports:[]
})
export class AppModule { 
  constructor(private readonly swaggerService: SwaggerService) {} // Inject SwaggerService

  configureSwagger(app) {
    this.swaggerService.configureSwagger(app); // Use the SwaggerService to configure Swagger
  }
  
 }


