import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { Course } from './courses.schema';
import { User } from '../users/users.schema';
import { Module as ModuleEntity } from './modules.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, User, ModuleEntity]),
  ],
  providers: [CoursesService],
  controllers: [CoursesController],
  exports: [CoursesService],
})
export class CoursesModule {}