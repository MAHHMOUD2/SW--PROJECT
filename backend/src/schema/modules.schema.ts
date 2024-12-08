import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Quiz } from '../quizes/quizzes.schema';
import { Course } from './courses.schema';

@Entity()
export class Module {
  

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column('simple-array', { nullable: true })
  resources: string[];

  @ManyToOne(() => Course, (course) => course.modules)
  course: Course;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Quiz, (quiz) => quiz.module)
  quizzes: Quiz[];
}
