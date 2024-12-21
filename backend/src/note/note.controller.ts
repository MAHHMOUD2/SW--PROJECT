import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './createnote.dto';
import { UpdateNoteDto } from './updatenote.dto';

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  async create(@Body() createNoteDto: CreateNoteDto) {
    return await this.noteService.create(createNoteDto, 1); // Pass user ID dynamically in real app
  }

  @Get()
  async findAll() {
    return await this.noteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.noteService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    return await this.noteService.update(id, updateNoteDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.noteService.delete(id);
    return { message: 'Note deleted successfully' };
  }
}