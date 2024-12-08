import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Module } from './modules.schema';
import { Progress } from './progress.schema';
import { User } from './users.Schema';

@Entity()
export class Course {
  
  @PrimaryGeneratedColumn()  // Auto-generated primary key
  id: number;  // Primary key field
  
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

  @Column('json', { nullable: true })  // Field to store versioning or history
  versions: any[];  // Use an array or object to track version history
}
