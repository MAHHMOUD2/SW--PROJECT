import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quiz } from './quiz.model';
import { UserPerformance } from './user-performance.model';
import { User } from '../users/user.model';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel('Quiz') private readonly quizModel: Model<Quiz>,
    @InjectModel('UserPerformance') private readonly userPerformanceModel: Model<UserPerformance>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  // Fetch quiz questions based on difficulty
  async getQuiz(userId: string, quizId: string): Promise<Quiz> {
    const userPerformance = await this.userPerformanceModel
      .findOne({ userId, quizId })
      .exec();

    if (!userPerformance) {
      throw new NotFoundException('User performance data not found');
    }

    let difficultyLevel = 2; // Default difficulty (Medium)
    if (userPerformance.performanceScore >= 70) {
      difficultyLevel = 3; // Increase difficulty to Hard
    } else if (userPerformance.performanceScore < 50) {
      difficultyLevel = 1; // Reduce difficulty to Easy
    }

    const quiz = await this.quizModel
      .findById(quizId)
      .exec();

    const filteredQuestions = quiz.questions.filter((question) => question.difficulty === difficultyLevel);

    return { ...quiz.toObject(), questions: filteredQuestions };
  }

  // Update the user's performance after completing the quiz
  async submitQuiz(userId: string, quizId: string, answers: string[]): Promise<void> {
    const quiz = await this.quizModel.findById(quizId).exec();
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    let correctAnswers = 0;
    quiz.questions.forEach((question, index) => {
      if (question.correctAnswer === answers[index]) {
        correctAnswers++;
      }
    });

    const performanceScore = (correctAnswers / quiz.questions.length) * 100;

    // Save user performance
    await this.userPerformanceModel.findOneAndUpdate(
      { userId, quizId },
      {
        $set: {
          correctAnswers,
          totalQuestions: quiz.questions.length,
          performanceScore,
        },
      },
      { upsert: true }
    );
  }
}
