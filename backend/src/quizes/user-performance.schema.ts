import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../users/user.schema';
import { Quiz } from './quizzes.schema';

@Schema({ timestamps: true })
export class UserPerformance extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Quiz', required: true })
  quiz: Quiz;

  @Prop({ required: true })
  score: number;

  @Prop({ required: true })
  totalQuestions: number;

  @Prop({ required: true })
  correctAnswers: number;

  @Prop({ default: 0 })
  timeTaken: number;

  @Prop({ default: new Date() })
  completedAt: Date;
}

export const UserPerformanceSchema = SchemaFactory.createForClass(UserPerformance);
