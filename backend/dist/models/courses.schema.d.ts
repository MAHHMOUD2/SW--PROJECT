import { Module } from './modules.schema';
import { Progress } from './progress.schema';
import { User } from './users.schema';
export declare class Course {
    id: string;
    title: string;
    description: string;
    category: string;
    difficultyLevel: string;
    createdBy: User;
    createdAt: Date;
    modules: Module[];
    progressRecords: Progress[];
}
