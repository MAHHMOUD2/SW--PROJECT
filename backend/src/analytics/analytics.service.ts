import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/user.schema';
import { Course } from '../courses/course.schema';
import { Quiz } from '../quizes/quiz.schema';
import { UserPerformance } from '../quizes/user-performance.schema';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Course') private readonly courseModel: Model<Course>,
    @InjectModel('Quiz') private readonly quizModel: Model<Quiz>,
    @InjectModel('UserPerformance') private readonly userPerformanceModel: Model<UserPerformance>,
  ) {}

  // Student Analytics
  async getStudentDashboard(userId: string) {
    const enrolledCourses = await this.courseModel
      .find({ enrolledStudents: userId })
      .select('title progress')
      .exec();

    const quizPerformance = await this.userPerformanceModel
      .find({ userId })
      .populate('moduleId', 'title')
      .exec();

    const averageScore = quizPerformance.reduce((acc, curr) => acc + curr.performanceScore, 0) / quizPerformance.length;

    return {
      enrolledCourses,
      completedCourses: enrolledCourses.filter(c => c.progress === 100),
      quizPerformance,
      averageScore,
    };
  }

  // Instructor Analytics
  async getCourseAnalytics(courseId: string) {
    const course = await this.courseModel
      .findById(courseId)
      .populate('enrolledStudents')
      .exec();

    const modulePerformance = await this.userPerformanceModel
      .aggregate([
        { $match: { courseId } },
        {
          $group: {
            _id: '$moduleId',
            averageScore: { $avg: '$performanceScore' },
            totalAttempts: { $sum: 1 },
          },
        },
      ])
      .exec();

    return {
      totalStudents: course.enrolledStudents.length,
      activeStudents: course.enrolledStudents.filter(s => s.lastActivityDate > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length,
      modulePerformance,
      completionRate: course.enrolledStudents.filter(s => s.progress === 100).length / course.enrolledStudents.length * 100,
    };
  }

  async getStudentEngagement(courseId: string) {
    const course = await this.courseModel
      .findById(courseId)
      .populate('enrolledStudents')
      .exec();

    const studentActivities = await Promise.all(
      course.enrolledStudents.map(async student => {
        const quizAttempts = await this.userPerformanceModel
          .countDocuments({ userId: student._id, courseId })
          .exec();

        const forumPosts = await this.forumPostModel
          .countDocuments({ author: student._id, course: courseId })
          .exec();

        return {
          student: { id: student._id, name: `${student.firstName} ${student.lastName}` },
          quizAttempts,
          forumPosts,
          lastActive: student.lastActivityDate,
        };
      })
    );

    return studentActivities;
  }

  // Quiz Analytics
  async getQuizAnalytics(moduleId: string) {
    const performances = await this.userPerformanceModel
      .find({ moduleId })
      .populate('userId', 'firstName lastName')
      .exec();

    const questionAnalytics = await this.userPerformanceModel.aggregate([
      { $match: { moduleId } },
      { $unwind: '$questionResponses' },
      {
        $group: {
          _id: '$questionResponses.questionId',
          correctCount: {
            $sum: { $cond: ['$questionResponses.isCorrect', 1, 0] },
          },
          totalAttempts: { $sum: 1 },
        },
      },
    ]).exec();

    return {
      totalAttempts: performances.length,
      averageScore: performances.reduce((acc, curr) => acc + curr.performanceScore, 0) / performances.length,
      questionAnalytics: questionAnalytics.map(qa => ({
        ...qa,
        difficultyRate: (qa.correctCount / qa.totalAttempts) * 100,
      })),
    };
  }
}
