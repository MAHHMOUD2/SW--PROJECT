import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { Course } from '../schema/courses.schema';  // Import Course entity
import { User } from '../schema/users.schema';  // Import User entity
import { Module as CourseModule } from '../schema/modules.schema';  // Import Module entity

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, User, CourseModule]),  // Register entities with TypeORM
  ],
  providers: [CoursesService],  // Register the CoursesService to be injectable
  controllers: [CoursesController],  // Register the CoursesController to handle routes
  exports: [CoursesService],  // Export the CoursesService if you need to inject it elsewhere
})
export class CoursesModule {}