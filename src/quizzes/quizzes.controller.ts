import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizDto } from '../dto/quizzes.dto'; 

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly service: QuizzesService) {}

  @Post()
  Add(@Body() body: QuizDto) {
    return this.service.Add(body);
  }

  @Get()
  FindAll() {
    return this.service.FindAll();
  }

  @Get(':quiz_Id')
  async FindOne(@Param('quiz_Id') quiz_Id: string) {
    return this.service.FindOne(quiz_Id);
  }

  @Put(':quiz_Id')
  async Update(@Param('quiz_Id') quiz_Id: string, @Body() body: QuizDto) {
    return this.service.Update(quiz_Id, body);
  }

  @Delete(':quiz_Id')
  Delete(@Param('quiz_Id') quiz_Id: string) {
    return this.service.Delete(quiz_Id);
  }

  @Post('/search')
  Search(@Query('key') key: string) {
    return this.service.Search(key);
  }
}
