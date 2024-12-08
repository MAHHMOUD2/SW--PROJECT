import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Instructor } from './instructor.entity';
import { Parser } from 'json2csv';
import PDFDocument from 'pdfkit';

@Injectable()
export class InstructorService {
  constructor(
    @InjectRepository(Instructor)
    private instructorRepository: Repository<Instructor>,
  ) {}

  async getAnalytics(instructorId: number) {
    const instructor = await this.instructorRepository.findOne({
      where: { id: instructorId },
      relations: ['students'],
    });

    if (!instructor) {
      throw new Error('Instructor not found');
    }

    const totalStudents = instructor.students.length;
    const averageCompletion = instructor.students.reduce(
      (sum, student) => sum + student.completionRate,
      0,
    ) / totalStudents;

    return {
      name: instructor.name,
      totalStudents,
      averageCompletion,
      students: instructor.students.map((s) => ({
        name: s.name,
        completionRate: s.completionRate,
        averageScore: s.averageScore,
      })),
    };
  }

  async generateCSVAnalytics(instructorId: number) {
    const analytics = await this.getAnalytics(instructorId);
    const fields = ['name', 'totalStudents', 'averageCompletion'];
    const parser = new Parser({ fields });
    return parser.parse(analytics);
  }

  async generatePDFAnalytics(instructorId: number) {
    const analytics = await this.getAnalytics(instructorId);

    const doc = new PDFDocument();
    const chunks = [];
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => Buffer.concat(chunks));

    doc.fontSize(18).text(Instructor Analytics for ${analytics.name});
    doc.text(Total Students: ${analytics.totalStudents});
    doc.text(Average Completion Rate: ${analytics.averageCompletion});
    doc.moveDown();
    doc.fontSize(14).text(Student Details:);
    analytics.students.forEach((student, index) => {
      doc.text(${index + 1}. ${student.name} - Completion: ${student.completionRate}%);
    });
    doc.end();

    return Buffer.concat(chunks);
  }
}