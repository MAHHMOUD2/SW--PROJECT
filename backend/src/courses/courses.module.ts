import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { Course } from '../models/courses.schema';
import { Module as CourseModule } from '../models/modules.schema';
import { Quiz } from '../models/quizzes.schema';

@Module({
  imports: [TypeOrmModule.forFeature([Course, CourseModule, Quiz])],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
