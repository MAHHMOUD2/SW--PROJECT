import { Module } from './modules.schema';
import { Response } from './responses.schema';
export declare class Quiz {
    id: string;
    title: string;
    questions: {
        questionText: string;
        options: string[];
        correctAnswer: string;
    }[];
    module: Module;
    responses: Response[];
    createdAt: Date;
}
