import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from './courses/courses.module';
import { User } from './models/users.schema';
import { Course } from './models/courses.schema';
import { Module as CourseModule } from './models/modules.schema';
import { Quiz } from './models/quizzes.schema';
import { Response } from './models/responses.schema';
import { Progress } from './models/progress.schema';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // Database type
      host: 'localhost', // Database host
      port: 5432, // Database port
      username: 'your_username', // Replace with your actual username
      password: 'your_password', // Replace with your actual password
      database: 'your_database', // Replace with your actual database name
      entities: [
        User, // Include the User entity
        Course, // Include the Course entity
        CourseModule, // Include the Module entity
        Quiz, // Include the Quiz entity
        Response, // Include the Response entity
        Progress, // Include the Progress entity
      ],
      synchronize: true, // Set to true only for development; avoid in production
    }),
    CoursesModule, // Import the Courses module
  ],
})
export class AppModule {}
