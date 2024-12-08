import { Repository } from 'typeorm';
import { Quiz } from '../models/quizzes.schema';
import { Response } from '../models/responses.schema';
export declare class QuizzesService {
    private readonly quizRepository;
    private readonly responseRepository;
    constructor(quizRepository: Repository<Quiz>, responseRepository: Repository<Response>);
    createQuiz(quizData: Partial<Quiz>): Promise<Quiz>;
    getQuizById(quizId: string): Promise<Quiz>;
    submitResponse(responseData: {
        quizId: string;
        userId: string;
        answers: {
            questionId: string;
            answer: string;
        }[];
    }): Promise<{
        score: number;
        feedback: any[];
    }>;
    getResults(quizId: string, userId: string): Promise<Response>;
}
