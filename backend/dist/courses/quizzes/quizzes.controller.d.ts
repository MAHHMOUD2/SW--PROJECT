import { QuizzesService } from './quizzes.service';
export declare class QuizzesController {
    private readonly quizzesService;
    constructor(quizzesService: QuizzesService);
    createQuiz(quizData: any): Promise<Quiz>;
    getQuiz(quizId: string): Promise<Quiz>;
    submitResponse(responseData: any): Promise<{
        score: number;
        feedback: any[];
    }>;
    getResults(quizId: string, userId: string): Promise<Response>;
}
