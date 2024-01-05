import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateNoteDto, UpdateNoteDto } from './dtos/notes.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('api/notes')
@ApiTags("Notes")
@ApiBearerAuth()
export class NotesController {
    constructor(private readonly notesService: NotesService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Request() request, @Query("skip") skip:number, @Query("limit") limit:number) {
      skip = isNaN(skip) ? 0 : skip
      limit = isNaN(limit) ? 10 : limit
      return this.notesService.findAll(request.user.userId, skip, limit);
    }
  
    @UseGuards(JwtAuthGuard)
    @Get(':id([a-zA-Z0-9-]{36})') //set the length to 36 to resolve the conflict with /search
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

    @UseGuards(JwtAuthGuard)
    @Get('/search')
    async search(@Query('q') serachTerm: string, @Request() request, @Query("skip") skip:number, @Query("limit") limit:number) {
      skip = isNaN(skip) ? 0 : skip
      limit = isNaN(limit) ? 10 : limit
      return await this.notesService.search(request.user.userId, serachTerm, skip, limit);
    }

  }
