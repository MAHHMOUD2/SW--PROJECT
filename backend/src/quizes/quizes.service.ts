import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quiz } from './schemas/quiz.schema';
import { Module } from './schemas/module.schema';
import { Question } from './schemas/question.schema';
import { UserPerformance } from './schemas/user-performance.schema';
import { User } from '../users/schemas/user.schema';
import { CreateModuleDto } from './dto/create-module.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

interface QuizResult {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  feedback: QuestionFeedback[];
}

interface QuestionFeedback {
  questionId: string;
  isCorrect: boolean;
  correctAnswer: string;
  explanation: string;
}

@Injectable()
export class QuizService {
  constructor(
    @InjectModel(Quiz.name) private readonly quizModel: Model<Quiz>,
    @InjectModel(Module.name) private readonly moduleModel: Model<Module>,
    @InjectModel(Question.name) private readonly questionModel: Model<Question>,
    @InjectModel(UserPerformance.name) private readonly userPerformanceModel: Model<UserPerformance>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  // Instructor Methods
  async createModule(instructorId: string, moduleData: CreateModuleDto): Promise<Module> {
    const module = new this.moduleModel({
      ...moduleData,
      instructorId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return module.save();
  }

  async addQuestionToModule(moduleId: string, questionData: CreateQuestionDto): Promise<Module> {
    const module = await this.moduleModel.findById(moduleId);
    if (!module) {
      throw new NotFoundException('Module not found');
    }

    const question = new this.questionModel({
      ...questionData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedQuestion = await question.save();
    
    return this.moduleModel.findByIdAndUpdate(
      moduleId,
      { 
        $push: { questions: savedQuestion }, 
        updatedAt: new Date() 
      },
      { new: true }
    ).exec();
  }

  async updateQuestion(questionId: string, updateData: UpdateQuestionDto): Promise<Question> {
    const question = await this.questionModel.findById(questionId);
    if (!question) {
      throw new NotFoundException('Question not found');
    }

    return this.questionModel.findByIdAndUpdate(
      questionId,
      { 
        ...updateData, 
        updatedAt: new Date() 
      },
      { new: true }
    ).exec();
  }

  async deleteQuestion(questionId: string): Promise<void> {
    const question = await this.questionModel.findById(questionId);
    if (!question) {
      throw new NotFoundException('Question not found');
    }

    await this.questionModel.findByIdAndUpdate(
      questionId,
      { 
        isActive: false, 
        updatedAt: new Date() 
      }
    ).exec();
  }

  // Student Methods
  async getQuiz(userId: string, moduleId: string): Promise<Quiz> {
    const userPerformance = await this.userPerformanceModel
      .findOne({ userId, moduleId })
      .exec();

    let difficultyLevel = 2; // Default difficulty (Medium)
    if (userPerformance) {
      if (userPerformance.performanceScore >= 70) {
        difficultyLevel = 3; // Increase difficulty to Hard
      } else if (userPerformance.performanceScore < 50) {
        difficultyLevel = 1; // Reduce difficulty to Easy
      }
    }

    const module = await this.moduleModel
      .findById(moduleId)
      .where('isActive').equals(true)
      .exec();

    if (!module) {
      throw new NotFoundException('Module not found');
    }

    // Filter questions by difficulty and active status
    const eligibleQuestions = module.questions.filter(
      q => q.difficulty === difficultyLevel && q.isActive
    );

    if (eligibleQuestions.length === 0) {
      throw new NotFoundException('No questions available for this difficulty level');
    }

    // Randomly select questions
    const selectedQuestions = this.shuffleArray(eligibleQuestions).slice(0, 10);

    const quiz = new this.quizModel({
      moduleId,
      questions: selectedQuestions,
      createdAt: new Date(),
    });

    return quiz.save();
  }

  async submitQuiz(userId: string, moduleId: string, answers: { questionId: string; answer: string }[]): Promise<QuizResult> {
    const module = await this.moduleModel.findById(moduleId);
    if (!module) {
      throw new NotFoundException('Module not found');
    }

    let correctAnswers = 0;
    const feedback: QuestionFeedback[] = [];

    for (const answer of answers) {
      const question = module.questions.find(q => q._id.toString() === answer.questionId);
      if (question) {
        const isCorrect = question.correctAnswer === answer.answer;
        if (isCorrect) correctAnswers++;
        
        feedback.push({
          questionId: answer.questionId,
          isCorrect,
          correctAnswer: question.correctAnswer,
          explanation: question.explanation,
        });
      }
    }

    const performanceScore = (correctAnswers / answers.length) * 100;

    // Update user performance
    await this.userPerformanceModel.findOneAndUpdate(
      { userId, moduleId },
      {
        $set: {
          correctAnswers,
          totalQuestions: answers.length,
          performanceScore,
          lastAttemptDate: new Date(),
        },
      },
      { upsert: true }
    ).exec();

    return {
      score: performanceScore,
      correctAnswers,
      totalQuestions: answers.length,
      feedback,
    };
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}
