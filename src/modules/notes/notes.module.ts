import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { Note } from './notes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElasticsearchService } from 'src/modules/common/services/elastic-search.service';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Note]),
    CommonModule
  ],
  providers: [NotesService],
  controllers: [NotesController]
})
export class NotesModule {}
