import { CoursesService } from './courses.service';
import { Course } from '../models/courses.schema';
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    createCourse(courseData: Partial<Course>): Promise<Course>;
    getAllCourses(): Promise<Course[]>;
    getCourseById(courseId: string): Promise<Course>;
    updateCourse(courseId: string, courseData: Partial<Course>): Promise<Course>;
    deleteCourse(courseId: string): Promise<void>;
}
