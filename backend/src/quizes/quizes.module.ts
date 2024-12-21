import { Schema, Document } from 'mongoose';

export const QuestionSchema = new Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
  difficulty: { type: Number, required: true, enum: [1, 2, 3] }, // 1: Easy, 2: Medium, 3: Hard
});

export const QuizSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  questions: [QuestionSchema],
});

export interface Question extends Document {
  question: string;
  options: string[];
  correctAnswer: string;
  difficulty: number; // 1 for easy, 3 for hard
}

export interface Quiz extends Document {
  title: string;
  description: string;
  questions: Question[];
}
