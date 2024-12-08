import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'your_username',
      password: 'your_password',
      database: 'your_database',
      entities: [User, Course, Module, Quiz, Response, Progress],
      synchronize: true, // Use only in development
    }),
    TypeOrmModule.forFeature([User, Course, Module, Quiz, Response, Progress]),
    CoursesModule,
  ],
})
export class AppModule {}
