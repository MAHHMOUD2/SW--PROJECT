import { schema, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Quiz } from './quizzes.schema';
import { User } from './users.schema';

@schema()
export class Response {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.responses)
  user: User;

  @ManyToOne(() => Quiz, (quiz) => quiz.responses)
  quiz: Quiz;

  @Column('jsonb')
  answers: { questionId: string; answer: string }[];

  @Column()
  score: number;

  @CreateDateColumn()
  submittedAt: Date;
}
