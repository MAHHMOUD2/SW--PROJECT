import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Module } from './modules.schema';
import { Progress } from '../models/progress.schema';
import { User } from '../users/users.Schema';

// Define the version interface
export interface CourseVersion {
  versionNumber: number;
  updatedAt: Date;
  modules: Module[];
}

@Entity()
export class Course {
  
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column('jsonb', { nullable: true })
  versions: CourseVersion[];

  @OneToMany(() => Module, (module) => module.course)
  modules: Module[];

  @OneToMany(() => Progress, (progress: Progress) => progress.course)
  progressRecords: Progress[];
}
