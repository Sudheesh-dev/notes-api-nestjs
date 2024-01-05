import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/users.entity';
import { SharedNote } from '../notes/entities/shared-notes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    User,
    SharedNote
  ])],
  providers: [UsersService],
  controllers: [UsersController],
  exports:[TypeOrmModule, UsersService]
})
export class UsersModule {}