import { schema, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './users.Schema';
import { Course } from './courses.schema';

@schema()
export class Progress {
 

  @ManyToOne(() => User, (user) => user.progressRecords)
  user: User;

  @ManyToOne(() => Course, (course) => course.progressRecords)
  course: Course;

  @Column('float')
  completionPercentage: number;
}
