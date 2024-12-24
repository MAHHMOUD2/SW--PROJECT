import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Message extends Document {
  @Prop({ required: true, ref: 'User' })
  sender: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true, ref: 'Chat' })
  chat: string;

  @Prop({ default: false })
  read: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;
}

@Schema()
export class Chat extends Document {
  @Prop({ required: true })
  type: 'private' | 'group' | 'course';

  @Prop({ type: [{ type: String, ref: 'User' }] })
  participants: string[];

  @Prop({ ref: 'Course' })
  courseId?: string;

  @Prop()
  groupName?: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: true })
  isActive: boolean;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
export const ChatSchema = SchemaFactory.createForClass(Chat);
