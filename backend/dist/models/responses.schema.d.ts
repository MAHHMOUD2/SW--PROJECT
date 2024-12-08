import { Quiz } from './quizzes.schema';
import { User } from './users.schema';
export declare class Response {
    id: string;
    user: User;
    quiz: Quiz;
    answers: {
        questionId: string;
        answer: string;
    }[];
    score: number;
    submittedAt: Date;
}
