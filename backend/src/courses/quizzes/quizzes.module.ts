import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { Quiz } from '../../models/quizzes.schema'; // Corrected import
import { Response } from '../../models/responses.schema'; // Corrected import

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Response])],
  controllers: [QuizzesController],
  providers: [QuizzesService],
})
export class QuizzesModule {}
