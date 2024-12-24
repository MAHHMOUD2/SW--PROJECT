import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/users.Schema';
import { Course } from '../courses/courses.schema';

@Entity()
export class Progress {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.progressRecords)
  user: User;

  @ManyToOne(() => Course, (course) => course.progressRecords)
  course: Course;

  @Column('float')
  completionPercentage: number;
}
