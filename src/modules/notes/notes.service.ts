import { BadRequestException, ConflictException, HttpException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, IsNull, Repository } from 'typeorm';
import { Note } from './entities/notes.entity';
import { CreateNoteDto, UpdateNoteDto } from './dtos/notes.dto';
import { ElasticsearchService } from 'src/modules/common/services/elastic-search.service';
import { ErrorMessages } from '../common/constants/constants';
import { SharedNote } from './entities/shared-notes.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class NotesService {
  private readonly logger = new Logger(NotesService.name)
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
    @InjectRepository(SharedNote)
    private readonly sharedNoteRepository: Repository<SharedNote>,
    private readonly dataSource: DataSource,
    private readonly elasticsearchService:ElasticsearchService,
    private readonly usersService:UsersService,
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
      throw new NotFoundException(ErrorMessages.NOTE_NOT_FOUND);
    }
    return note;
  }

  async create(userId: string, createNoteDto: CreateNoteDto): Promise<Note> {
    let note = this.noteRepository.create({ ...createNoteDto, userId });
    //save with a transaction 
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      note = await queryRunner.manager.save(note);
      await this.elasticsearchService.addNoteToIndex(note.id, {
        title:note.title,
        content:note.content,
        userId:note.userId,
      })
      //commit once changes are made in elasticsearch
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      this.logger.error(ErrorMessages.INTERNAL_SERVER_ERROR, err.stack)
      throw new HttpException(ErrorMessages.INTERNAL_SERVER_ERROR, 500)
    } finally {
      await queryRunner.release();
    }
    return note;
  }

  async update(userId: string, id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const note = await this.findOne(userId, id);
    let updatedNote = this.noteRepository.create({ ...note, ...updateNoteDto });
    //save with a transaction 
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      updatedNote = await this.noteRepository.save(updatedNote);
      await this.elasticsearchService.updateNoteById(note.id, {
        title:updatedNote.title,
        content:updatedNote.content,
        userId:updatedNote.userId,
      })
      //commit once changes are made in elasticsearch
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      this.logger.error(ErrorMessages.INTERNAL_SERVER_ERROR, err.stack)
      throw new HttpException(ErrorMessages.INTERNAL_SERVER_ERROR, 500)
    } finally {
      await queryRunner.release();
    }
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

  async shareNoteWithUser(userId: string, noteId: string, shareToUserId:string): Promise<SharedNote> {
    if(userId === shareToUserId){
      throw new BadRequestException(ErrorMessages.CANNOT_SHARE_TO_OWN_ID)
    }
    const isAlreadyShared = await this.sharedNoteRepository.findOne({
      where:{userId:shareToUserId, noteId}
    })
    if(isAlreadyShared){
      throw new ConflictException(ErrorMessages.NOTE_SHARED_ALREADY)
    }
    const note = await this.findOne(userId, noteId);
    const shareToUser = await this.usersService.findById(shareToUserId)
    if(!shareToUser){
      throw new NotFoundException(ErrorMessages.USER_NOT_FOUND);
    }
    const sharedNote = new SharedNote();
    sharedNote.note = note;
    sharedNote.user = shareToUser;

    return this.sharedNoteRepository.save(sharedNote);
  }

  async getNotesSharedWithUser(userId: string, skip:number=0, limit:number=10){
    const result = await this.sharedNoteRepository.find({
      where:{
        userId
      },
      relations:["note"],
      skip,
      take:limit
    })
    return result?.map(data => data.note) ?? [];
  }

}
