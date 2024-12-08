import { Controller, Post, Put, Get, Body, Param, Query } from '@nestjs/common';
import { CoursesService } from './courses.service';  // Import the service
import { Course } from '../schema/courses.schema';  // Import the Course entity
import { Module } from '../schema/modules.schema';  // Import the Module entity
import { User } from '../schema/users.schema';  // Import the User entity

@Controller('courses')  // Define the base path for the course-related routes
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}  // Inject the service

  // Endpoint to add a module to a course
  @Post(':courseId/modules')
  async addModuleToCourse(
    @Param('courseId') courseId: number,  // Get the courseId from the URL parameters
    @Body() moduleData: Partial<Module>  // Get the module data from the request body
  ): Promise<Module> {
    return this.coursesService.addModuleToCourse(courseId, moduleData);  // Call the service method
  }

  // Endpoint to update a course with versioning
  @Put(':courseId')
  async updateCourse(
    @Param('courseId') courseId: number,  // Get the courseId from the URL parameters
    @Body() updateData: Partial<Course>  // Get the course update data from the request body
  ): Promise<Course> {
    return this.coursesService.updateCourseWithVersioning(courseId, updateData);  // Call the service method
  }

  // Endpoint to search for a student by ID
  @Get('student')
  async searchStudentById(@Query('id') studentId: string): Promise<User> {
    return this.coursesService.searchStudentById(studentId);  // Call the service method
  }

  // Endpoint to search for an instructor by ID
  @Get('instructor')
  async searchInstructorById(@Query('id') instructorId: string): Promise<User> {
    return this.coursesService.searchInstructorById(instructorId);  // Call the service method
  }

  // Search for course by ID
  @Get(':courseId')
  async searchCourseById(
    @Param('courseId') courseId: number, // Get courseId from URL
  ): Promise<Course> {
    return this.coursesService.searchCourseById(courseId);  // Call service to search for course
  }
}
