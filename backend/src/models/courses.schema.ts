import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Module } from './modules.schema';
import { Progress } from './progress.schema';
import { User } from './users.schema';

@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
