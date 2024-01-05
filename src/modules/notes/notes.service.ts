import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Note } from './notes.entity';
import { CreateNoteDto, UpdateNoteDto } from './dtos/notes.dto';
import { ElasticsearchService } from 'src/modules/common/services/elastic-search.service';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
    private readonly elasticsearchService:ElasticsearchService,
  ) {}

  async findAll(userId: string,  skip:number=0, limit:number=10): Promise<Note[]> {
    return this.noteRepository.find({
       where: {
         userId, deletedAt:IsNull() 
      },
      skip:skip,
      take:limit,
    });
  }

  async findOne(userId: string, id: string): Promise<Note> {
    const note = await this.noteRepository.findOne({ where: { id, userId, deletedAt:IsNull() } });
    if (!note) {
      throw new NotFoundException('Note with the given id is not found');
    }
    return note;
  }

  async create(userId: string, createNoteDto: CreateNoteDto): Promise<Note> {
    let note = this.noteRepository.create({ ...createNoteDto, userId });
    note = await this.noteRepository.save(note);
    await this.elasticsearchService.addNoteToIndex(note.id, {
      title:note.title,
      content:note.content,
      userId:note.userId,
    })
    return note;
  }

  async update(userId: string, id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const note = await this.findOne(userId, id);
    let updatedNote = this.noteRepository.create({ ...note, ...updateNoteDto });
    updatedNote = await this.noteRepository.save(updatedNote);
    await this.elasticsearchService.updateNoteById(note.id, {
      title:note.title,
      content:note.content,
      userId:note.userId,
    })
    return updatedNote;
  }

  async softDelete(userId: string, id: string): Promise<Note> {
    const note = await this.findOne(userId, id);
    note.deletedAt = Math.floor(Date.now()/1000)
    let softDeletedNote = await this.noteRepository.save(note);
    await this.elasticsearchService.removeNoteById(note.id)
    return softDeletedNote;
  }

  async search(userId: string, searchTerm: string, skip:number, limit:number){
    return await this.elasticsearchService.searchNotesByTermAndUserId(userId, searchTerm, skip, limit)
  }

}
