import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Course } from './courses.schema';

@Entity()
export class Module {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  order: number;

  @ManyToOne(() => Course, course => course.modules)
  course: Course;
}
