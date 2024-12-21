import { Test, TestingModule } from '@nestjs/testing';
import { NoteService } from './note.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Note } from './note.schema';

describe('NoteService', () => {
  let service: NoteService;

  const mockNoteRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NoteService,
        { provide: getRepositoryToken(Note), useValue: mockNoteRepository },
      ],
    }).compile();

    service = module.get<NoteService>(NoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Add specific service test cases
});