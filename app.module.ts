import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'backend/src/models/users.schema';
import { Course } from 'backend/src/models/courses.schema';
import { Response } from 'backend/src/models/responses.schema';
import { Progress } from 'backend/src/models/progress.schema';
import { BackupModule } from './backup/backup.module';

@Module({
  imports: [BackupModule],
})


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // or 'mysql' or 'sqlite', based on your DB
      host: 'localhost',
      port: 5432, // Change to your DB port if necessary
      username: 'your_database_username',
      password: 'your_database_password',
      database: 'your_database_name',
      entities: [User, Course, Response, Progress],
      synchronize: true, // Set to false in production
    }),
    TypeOrmModule.forFeature([User, Course, Response, Progress]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
