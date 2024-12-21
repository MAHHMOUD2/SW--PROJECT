import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  // Fetch quiz questions based on difficulty (adaptive)
  @UseGuards(JwtAuthGuard)
  @Get(':quizId')
  async getQuiz(@Param('quizId') quizId: string, @Body('userId') userId: string) {
    return this.quizService.getQuiz(userId, quizId);
  }

  // Submit quiz answers and track performance
  @UseGuards(JwtAuthGuard)
  @Post('submit')
  async submitQuiz(@Body('userId') userId: string, @Body('quizId') quizId: string, @Body('answers') answers: string[]) {
    return this.quizService.submitQuiz(userId, quizId, answers);
  }
}
