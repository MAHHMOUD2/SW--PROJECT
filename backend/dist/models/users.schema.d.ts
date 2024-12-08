import { Response } from './responses.schema';
import { Progress } from './progress.schema';
import { Course } from './courses.schema';
export declare class User {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    role: string;
    pictureUrl: string;
    createdAt: Date;
    responses: Response[];
    progressRecords: Progress[];
    createdCourses: Course[];
}
