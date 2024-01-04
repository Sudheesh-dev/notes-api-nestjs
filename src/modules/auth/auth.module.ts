import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ENV_VARS } from 'src/common/constants/constants';
import { JwtStrategy } from './strategies/jwt-stategy';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(ENV_VARS.JWT_SECRET),
        global: true,
        signOptions: { expiresIn: '1d' },
      }),
      inject:[ConfigService]
    }),
    UsersModule
  ],
  providers: [AuthService, UsersService, JwtStrategy],
  controllers: [AuthController],
  exports: []
})

export class AuthModule { }