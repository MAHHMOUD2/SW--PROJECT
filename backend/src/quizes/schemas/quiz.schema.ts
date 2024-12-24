import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Question } from './question.schema';

@Schema()
export class Quiz extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Module' })
  moduleId: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Question' }] })
  questions: Question[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
