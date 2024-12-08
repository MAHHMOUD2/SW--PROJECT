import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Quiz } from './quizzes.schema';
import { Course } from './courses.schema';

@Entity()
export class Module {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
