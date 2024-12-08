import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async getStudentDashboard(studentId: number) {
    const student = await this.studentRepository.findOne({
      where: { id: studentId },
      relations: ['instructor'],
    });

    if (!student) {
      throw new Error('Student not found');
    }

    return {
      name: student.name,
      completionRate: student.completionRate,
      averageScore: student.averageScore,
      engagementTrends: student.engagementTrends,
    };
  }
}