import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.schema';
import { CreateNoteDto } from './createnote.dto';
import { UpdateNoteDto } from './updatenote.dto';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}

  async create(createNoteDto: CreateNoteDto, userId: number): Promise<Note> {
    const note = this.noteRepository.create({ ...createNoteDto, createdBy: { id: userId } });
    return await this.noteRepository.save(note);
  }

  async findAll(): Promise<Note[]> {
    return await this.noteRepository.find({ relations: ['createdBy'] });
  }

  async findOne(id: number): Promise<Note> {
    const note = await this.noteRepository.findOne(id, { relations: ['createdBy'] });
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    return note;
  }

  async update(id: number, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const note = await this.findOne(id);
    Object.assign(note, updateNoteDto);
    return await this.noteRepository.save(note);
  }

  async delete(id: number): Promise<void> {
    const note = await this.findOne(id);
    await this.noteRepository.remove(note);
  }
}