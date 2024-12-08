import { Controller, Get, Param } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get(':id/dashboard')
  async getDashboard(@Param('id') id: number) {
    return this.studentService.getStudentDashboard(id);
  }
}