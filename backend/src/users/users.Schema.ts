import { schema, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Response } from '../models/responses.schema';
import { Progress } from '../models/progress.schema';
import { Course } from './courses.schema';

@schema()
export class User {
  /**chat forms progress  */
 
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  role: string;

  @Column({ nullable: true })
  pictureUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Response, (response) => response.user)
  responses: Response[];

  @OneToMany(() => Progress, (progress) => progress.user)
  progressRecords: Progress[];

  @OneToMany(() => Course, (course) => course.createdBy)
  createdCourses: Course[];
}
