import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class UserPerformance extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Module' })
  moduleId: string;

  @Prop({ required: true })
  correctAnswers: number;

  @Prop({ required: true })
  totalQuestions: number;

  @Prop({ required: true })
  performanceScore: number;

  @Prop({ default: Date.now })
  lastAttemptDate: Date;

  @Prop({ type: [{ 
    questionId: { type: Types.ObjectId, ref: 'Question' },
    isCorrect: Boolean,
    answer: String
  }] })
  questionResponses: Array<{
    questionId: string;
    isCorrect: boolean;
    answer: string;
  }>;
}

export const UserPerformanceSchema = SchemaFactory.createForClass(UserPerformance);
