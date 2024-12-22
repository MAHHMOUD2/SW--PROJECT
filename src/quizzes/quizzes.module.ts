import { Module } from '@nestjs/common';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Quiz, QuizSchema } from '../models/quizzes.schema'; 

@Module({
  imports: [MongooseModule.forFeature([{ name: Quiz.name, schema: QuizSchema }])],
  controllers: [QuizzesController],
  providers: [QuizzesService],
})
export class QuizzesModule {}
