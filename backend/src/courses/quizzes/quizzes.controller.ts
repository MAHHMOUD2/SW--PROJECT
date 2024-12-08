import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post('/create')
  async createQuiz(@Body() quizData: any) {
    return await this.quizzesService.createQuiz(quizData);
  }

  @Get('/:id')
  async getQuiz(@Param('id') quizId: string) {
    return await this.quizzesService.getQuizById(quizId);
  }

  @Post('/submit')
  async submitResponse(@Body() responseData: any) {
    return await this.quizzesService.submitResponse(responseData);
  }

  @Get('/results/:quizId/:userId')
  async getResults(
    @Param('quizId') quizId: string,
    @Param('userId') userId: string,
  ) {
    return await this.quizzesService.getResults(quizId, userId);
  }
}
