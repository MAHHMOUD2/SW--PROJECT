import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from '../models/quizzes.schema';
import { Response } from '../models/responses.schema';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
    @InjectRepository(Response)
    private readonly responseRepository: Repository<Response>,
  ) {}

  // Create a new quiz
  async createQuiz(quizData: Partial<Quiz>): Promise<Quiz> {
    const quiz = this.quizRepository.create(quizData);
    return this.quizRepository.save(quiz);
  }

  // Fetch a quiz by ID
  async getQuizById(quizId: string): Promise<Quiz> {
    const quiz = await this.quizRepository.findOne({
      where: { id: quizId },
      relations: ['module', 'responses'], // Include module and responses
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${quizId} not found`);
    }

    return quiz;
  }

  // Submit a quiz response
  async submitResponse(responseData: {
    quizId: string;
    userId: string;
    answers: { questionId: string; answer: string }[];
  }): Promise<{ score: number; feedback: any[] }> {
    const { quizId, userId, answers } = responseData;

    // Fetch the quiz
    const quiz = await this.quizRepository.findOne({ where: { id: quizId } });

    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${quizId} not found`);
    }

    // Validate answers and calculate score
    let score = 0;
    const feedback = quiz.questions.map((question) => {
      const userAnswer = answers.find(
        (ans) => ans.questionId === question.id,
      )?.answer;
      const correct = userAnswer === question.correctAnswer;

      if (correct) score += 10; // Increment score for correct answers

      return {
        questionId: question.id,
        questionText: question.questionText,
        userAnswer,
        correct,
      };
    });

    // Create and save the response
    const response = this.responseRepository.create({
      quiz: { id: quizId } as Quiz,
      user: { id: userId } as any, // Ensure proper user relationship reference
      answers,
      score,
    });
    await this.responseRepository.save(response);

    return { score, feedback };
  }

  // Fetch results for a specific user and quiz
  async getResults(quizId: string, userId: string): Promise<Response> {
    const result = await this.responseRepository.findOne({
      where: { quiz: { id: quizId }, user: { id: userId } },
      relations: ['quiz', 'user'], // Include related quiz and user data
    });

    if (!result) {
      throw new NotFoundException(
        `Results not found for quiz ID ${quizId} and user ID ${userId}`,
      );
    }

    return result;
  }
}
