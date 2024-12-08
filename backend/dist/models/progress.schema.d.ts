import { User } from './users.schema';
import { Course } from './courses.schema';
export declare class Progress {
    id: string;
    user: User;
    course: Course;
    completionPercentage: number;
}
