import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Question } from './question.schema';

@Schema()
export class Module extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [{ type: String }] })
  keywords: string[];

  @Prop({ required: true })
  instructorId: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: [{ type: Question }] })
  questions: Question[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ModuleSchema = SchemaFactory.createForClass(Module);
