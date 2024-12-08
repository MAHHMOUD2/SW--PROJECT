import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from '../models/courses.schema';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post('/create')
  async createCourse(@Body() courseData: Partial<Course>): Promise<Course> {
    return this.coursesService.createCourse(courseData);
  }

  @Get()
  async getAllCourses(): Promise<Course[]> {
    return this.coursesService.getAllCourses();
  }

  @Get('/:id')
  async getCourseById(@Param('id') courseId: string): Promise<Course> {
    return this.coursesService.getCourseById(courseId);
  }

  @Put('/:id')
  async updateCourse(
    @Param('id') courseId: string,
    @Body() courseData: Partial<Course>,
  ): Promise<Course> {
    return this.coursesService.updateCourse(courseId, courseData);
  }

  @Delete('/:id')
  async deleteCourse(@Param('id') courseId: string): Promise<void> {
    return this.coursesService.deleteCourse(courseId);
  }
}
