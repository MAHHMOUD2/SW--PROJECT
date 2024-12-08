import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Instructor } from '../instructor/instructor.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'float' })
  completionRate: number;

  @Column({ type: 'float' })
  averageScore: number;

  @Column({ type: 'jsonb' })
  engagementTrends: object;

  @ManyToOne(() => Instructor, (instructor) => instructor.students)
  instructor: Instructor;
}