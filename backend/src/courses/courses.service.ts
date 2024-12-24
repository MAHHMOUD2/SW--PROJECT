import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './courses.schema'; 
import { User } from '../users/users.schema';     
import { Module } from './modules.schema'; 

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,   
    
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,      
    
    @InjectRepository(Module)
    private readonly moduleRepository: Repository<Module>   
  ) {}

  // Add a module to a course
  async addModuleToCourse(
    courseId: number, 
    moduleData: Partial<Module>
  ): Promise<Module> {
    const course = await this.courseRepository.findOne({ where: { id: courseId } });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const module = this.moduleRepository.create({
      ...moduleData,
      course,
    });

    return this.moduleRepository.save(module);
  }

  // Update course with versioning
  async updateCourseWithVersioning(
    courseId: number, 
    updateData: Partial<Course>
  ): Promise<Course> {
    const course = await this.courseRepository.findOne({ 
      where: { id: courseId }, 
      relations: ['modules'] 
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const version = {
      versionNumber: (course.versions?.length || 0) + 1,
      updatedAt: new Date(),
      modules: course.modules,
    };

    course.versions = [...(course.versions || []), version];
    Object.assign(course, updateData);

    return this.courseRepository.save(course);
  }

  // Search student by ID
  async searchStudentById(studentId: string): Promise<User> {
    const studentIdNumber = Number(studentId); // Convert studentId to a number

    if (isNaN(studentIdNumber)) {
      throw new NotFoundException('Invalid student ID');
    }

    const student = await this.userRepository.findOne({
      where: { id: studentIdNumber }, // Use the converted number
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return student;
  }

  // Search instructor by ID
  async searchInstructorById(instructorId: string): Promise<User> {
    const instructorIdNumber = Number(instructorId); // Convert instructorId to a number

    if (isNaN(instructorIdNumber)) {
      throw new NotFoundException('Invalid instructor ID');
    }

    const instructor = await this.userRepository.findOne({
      where: { id: instructorIdNumber }, // Use the converted number
    });

    if (!instructor) {
      throw new NotFoundException('Instructor not found');
    }

    return instructor;
  }
  
  async searchCourseById(courseId: number): Promise<Course> {
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
      relations: ['modules'],  // Include related modules if needed
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course;
  }
}