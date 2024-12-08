import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './users.schema';
import { Course } from './courses.schema';

@Entity()
export class Progress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.progressRecords)
  user: User;

  @ManyToOne(() => Course, (course) => course.progressRecords)
  course: Course;

  @Column('float')
  completionPercentage: number;
}
