import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateNoteDto } from './dtos/create-note.dto';
import { UpdateNoteDto } from './dtos/update-note.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('api/notes')
@ApiTags("Notes")
@ApiBearerAuth()
export class NotesController {
    constructor(private readonly notesService: NotesService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Request() request) {
      return this.notesService.findAll(request.user.userId);
    }
  
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: string, @Request() request) {
      return this.notesService.findOne(request.user.userId, id );
    }
  
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.CREATED)
    @Post()
    async create(@Body() createNoteDto: CreateNoteDto, @Request() request) {
      return this.notesService.create(request.user.userId, createNoteDto);
    }
  
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto, @Request() request) {
      return this.notesService.update(request.user.userId, id, updateNoteDto);
    }
  
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    async remove(@Param('id') id: string, @Request() request) {
      await this.notesService.softDelete(request.user.userId, id);
    }

  }
