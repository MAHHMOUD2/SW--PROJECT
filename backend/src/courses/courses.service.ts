import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../models/courses.schema';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async createCourse(courseData: Partial<Course>): Promise<Course> {
    const course = this.courseRepository.create(courseData);
    return this.courseRepository.save(course);
  }

  async getAllCourses(): Promise<Course[]> {
    return this.courseRepository.find({ relations: ['modules'] });
  }

  async getCourseById(courseId: string): Promise<Course> {
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
      relations: ['modules'],
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    return course;
  }

  async updateCourse(courseId: string, courseData: Partial<Course>): Promise<Course> {
    const course = await this.getCourseById(courseId);
    Object.assign(course, courseData);
    return this.courseRepository.save(course);
  }

  async deleteCourse(courseId: string): Promise<void> {
    const result = await this.courseRepository.delete(courseId);
    if (result.affected === 0) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }
  }
}
