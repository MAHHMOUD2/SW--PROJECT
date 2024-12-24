import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ForumPost extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true, ref: 'User' })
  author: string;

  @Prop({ required: true, ref: 'Course' })
  course: string;

  @Prop({ type: [{ type: String, ref: 'ForumComment' }] })
  comments: string[];

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

@Schema()
export class ForumComment extends Document {
  @Prop({ required: true })
  content: string;

  @Prop({ required: true, ref: 'User' })
  author: string;

  @Prop({ required: true, ref: 'ForumPost' })
  post: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ForumPostSchema = SchemaFactory.createForClass(ForumPost);
export const ForumCommentSchema = SchemaFactory.createForClass(ForumComment);
