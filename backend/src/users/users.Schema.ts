import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Response } from '../models/responses.schema';
import { Progress } from '../models/progress.schema';
import { Course } from '../courses/courses.schema';

@Schema()
export class User extends Document {
  /**chat forms progress  */
 
  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  passwordHash: string;

  @Prop()
  role: string;

  @Prop({ nullable: true })
  pictureUrl: string;

  @Prop()
  createdAt: Date;

  @Prop({ type: [{ type: 'ObjectId', ref: 'Response' }] })
  responses: Response[];

  @Prop({ type: [{ type: 'ObjectId', ref: 'Progress' }] })
  progressRecords: Progress[];

  @Prop({ type: [{ type: 'ObjectId', ref: 'Course' }] })
  createdCourses: Course[];
}

export const UserSchema = SchemaFactory.createForClass(User);
