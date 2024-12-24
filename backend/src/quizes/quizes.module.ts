import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizController } from './quizes.controller';
import { QuizService } from './quizes.service';
import { Quiz, QuizSchema } from './schemas/quiz.schema';
import { Question, QuestionSchema } from './schemas/question.schema';
import { Module as CourseModule, ModuleSchema } from './schemas/module.schema';
import { UserPerformance, UserPerformanceSchema } from './schemas/user-performance.schema';
import { User, UserSchema } from '../users/user.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Quiz.name, schema: QuizSchema },
      { name: Question.name, schema: QuestionSchema },
      { name: CourseModule.name, schema: ModuleSchema },
      { name: UserPerformance.name, schema: UserPerformanceSchema },
      { name: User.name, schema: UserSchema },
    ]),
    ConfigModule,
  ],
  controllers: [QuizController],
  providers: [QuizService],
  exports: [QuizService],
})
export class QuizesModule {}