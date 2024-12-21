import { Schema, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Module } from './modules.schema';
import { Progress } from './progress.schema';
import { User } from './users.Schema';

@Schema()
export class Course {
  
  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  category: string;

  @Column()
  difficultyLevel: string;

  @ManyToOne(() => User, (user) => user.createdCourses)
  createdBy: User;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Module, (module) => module.course)
  modules: Module[];

  @OneToMany(() => Progress, (progress) => progress.course)
  progressRecords: Progress[];
}
