import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { Note } from './entities/notes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common/common.module';
import { SharedNote } from './entities/shared-notes.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Note,
      SharedNote
    ]),
    CommonModule,
    UsersModule
  ],
  providers: [NotesService],
  controllers: [NotesController]
})
export class NotesModule {}
