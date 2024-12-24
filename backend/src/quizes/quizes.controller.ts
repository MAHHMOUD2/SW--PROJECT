import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  UseGuards, 
  Request, 
  HttpCode,
  HttpStatus,
  NotFoundException,
  BadRequestException
} from '@nestjs/common';
import { QuizService } from './quizes.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateModuleDto } from './dto/create-module.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Quiz } from './schemas/quiz.schema';
import { Module } from './schemas/module.schema';
import { Question } from './schemas/question.schema';
import { QuizResult } from './interfaces/quiz-result.interface';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('quizes')
@Controller('quizes')
@ApiBearerAuth()
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  // Fetch quiz questions based on difficulty (adaptive)
  @Get(':quizId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get quiz questions based on difficulty' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Quiz questions retrieved successfully' })
  async getQuizById(@Param('quizId') quizId: string, @Body('userId') userId: string): Promise<Quiz> {
    try {
      return await this.quizService.getQuiz(userId, quizId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  // Submit quiz answers and track performance
  @Post('submit')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Submit quiz answers' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Quiz submitted successfully' })
  async submitQuizById(
    @Body('userId') userId: string, 
    @Body('quizId') quizId: string, 
    @Body('answers') answers: { questionId: string; answer: string }[]
  ): Promise<QuizResult> {
    try {
      return await this.quizService.submitQuiz(userId, quizId, answers);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  // Instructor endpoints
  @Post('modules')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('instructor')
  @ApiOperation({ summary: 'Create a new module' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Module created successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  async createModule(
    @Request() req,
    @Body() createModuleDto: CreateModuleDto
  ): Promise<Module> {
    try {
      return await this.quizService.createModule(req.user.id, createModuleDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('modules/:moduleId/questions')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('instructor')
  @ApiOperation({ summary: 'Add a question to a module' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Question added successfully' })
  async addQuestion(
    @Param('moduleId') moduleId: string,
    @Body() createQuestionDto: CreateQuestionDto
  ): Promise<Module> {
    try {
      return await this.quizService.addQuestionToModule(moduleId, createQuestionDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  @Put('questions/:questionId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('instructor')
  @ApiOperation({ summary: 'Update a question' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Question updated successfully' })
  async updateQuestion(
    @Param('questionId') questionId: string,
    @Body() updateQuestionDto: UpdateQuestionDto
  ): Promise<Question> {
    try {
      return await this.quizService.updateQuestion(questionId, updateQuestionDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  @Delete('questions/:questionId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('instructor')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a question' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Question deleted successfully' })
  async deleteQuestion(@Param('questionId') questionId: string): Promise<void> {
    try {
      await this.quizService.deleteQuestion(questionId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  // Student endpoints
  @Get('modules/:moduleId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get a quiz for a module' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Quiz retrieved successfully' })
  async getModuleQuiz(
    @Request() req,
    @Param('moduleId') moduleId: string
  ): Promise<Quiz> {
    try {
      return await this.quizService.getQuiz(req.user.id, moduleId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  @Post('modules/:moduleId/submit')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Submit quiz answers for a module' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Quiz submitted successfully' })
  async submitModuleQuiz(
    @Request() req,
    @Param('moduleId') moduleId: string,
    @Body() answers: { questionId: string; answer: string }[]
  ): Promise<QuizResult> {
    try {
      return await this.quizService.submitQuiz(req.user.id, moduleId, answers);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }
}
