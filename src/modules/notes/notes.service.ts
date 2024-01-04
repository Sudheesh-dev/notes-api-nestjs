import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Note } from './notes.entity';
import { CreateNoteDto } from './dtos/create-note.dto';
import { UpdateNoteDto } from './dtos/update-note.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}

  async findAll(userId: string): Promise<Note[]> {
    return this.noteRepository.find({ where: { userId, deletedAt:IsNull() } });
  }

  async findOne(userId: string, id: string): Promise<Note> {
    const note = await this.noteRepository.findOne({ where: { id, userId, deletedAt:IsNull() } });
    if (!note) {
      throw new NotFoundException('Note with the given id is not found');
    }
    return note;
  }

  async create(userId: string, createNoteDto: CreateNoteDto): Promise<Note> {
    const note = this.noteRepository.create({ ...createNoteDto, userId });
    return this.noteRepository.save(note);
  }

  async update(userId: string, id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const note = await this.noteRepository.findOne({ where: { id, userId, deletedAt:IsNull() } });
    if (!note) {
      throw new NotFoundException('Note with the given id is not found');
    }
    const updatedNote = this.noteRepository.create({ ...note, ...updateNoteDto });
    return this.noteRepository.save(updatedNote);
  }

  async softDelete(userId: string, id: string): Promise<Note> {
    const note = await this.noteRepository.findOne({ where: { id, userId, deletedAt: IsNull() } });
    if (!note) {
      throw new NotFoundException('Note with the given id is not found');
    }
    note.deletedAt = Math.floor(Date.now()/1000)
    return await this.noteRepository.save(note);
  }
}
