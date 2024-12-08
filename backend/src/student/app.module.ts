import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student/student.entity';
import { Instructor } from './instructor/instructor.entity';
import { StudentService } from './student/student.service';
import { InstructorService } from './instructor/instructor.service';
import { StudentController } from './student/student.controller';
import { InstructorController } from './instructor/instructor.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'analytics',
      entities: [Student, Instructor],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Student, Instructor]),
  ],
  controllers: [StudentController, InstructorController],
  providers: [StudentService, InstructorService],
})
export class AppModule {}