import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Module } from './modules.schema';
import { Response } from './responses.schema';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('jsonb')
  questions: { questionText: string; options: string[]; correctAnswer: string }[];

  @ManyToOne(() => Module, (module) => module.quizzes)
  module: Module;

  @OneToMany(() => Response, (response) => response.quiz)
  responses: Response[];

  @CreateDateColumn()
  createdAt: Date;
}
