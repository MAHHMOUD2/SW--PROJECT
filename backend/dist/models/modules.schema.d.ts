import { Quiz } from './quizzes.schema';
import { Course } from './courses.schema';
export declare class Module {
    id: string;
    title: string;
    content: string;
    resources: string[];
    course: Course;
    createdAt: Date;
    quizzes: Quiz[];
}
