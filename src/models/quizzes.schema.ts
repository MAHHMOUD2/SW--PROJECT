import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuizDocument = Quiz & Document;

@Schema({ timestamps: true })
export class Quiz {
  @Prop({ required: true, unique: true })
  quiz_Id: string;

  @Prop({ required: true })
  module_Id: string;

  @Prop()
  questions: {
    questionText: string;
    options: string[];
    correctAnswer: string;
  }[];

  @Prop({ type: Date })
  created_at: Date;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
