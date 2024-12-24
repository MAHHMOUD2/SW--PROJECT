import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Question } from './question.schema';

@Schema()
export class Module extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String] })
  keywords: string[];

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  instructorId: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Question' }] })
  questions: Question[];

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ModuleSchema = SchemaFactory.createForClass(Module);
