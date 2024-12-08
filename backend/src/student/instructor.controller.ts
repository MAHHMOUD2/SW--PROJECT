import { Controller, Get, Param, Res } from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { Response } from 'express';

@Controller('instructors')
export class InstructorController {
  constructor(private readonly instructorService: InstructorService) {}

  @Get(':id/analytics')
  async getAnalytics(@Param('id') id: number) {
    return this.instructorService.getAnalytics(id);
  }

  @Get(':id/analytics/csv')
  async downloadCSV(@Param('id') id: number, @Res() res: Response) {
    const csv = await this.instructorService.generateCSVAnalytics(id);
    res.header('Content-Type', 'text/csv');
    res.attachment('analytics.csv');
    res.send(csv);
  }

  @Get(':id/analytics/pdf')
  async downloadPDF(@Param('id') id: number, @Res() res: Response) {
    const pdf = await this.instructorService.generatePDFAnalytics(id);
    res.header('Content-Type', 'application/pdf');
    res.attachment('analytics.pdf');
    res.send(pdf);
  }
}