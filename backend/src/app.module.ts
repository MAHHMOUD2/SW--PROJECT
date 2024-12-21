import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core'; // Import for global guards
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { CoursesModule } from './courses/courses.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesGuard } from './guards/roles.guard'; // Adjust the path based on your project structure

@Module({
  imports: [
    StudentModule,
    CoursesModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nestStudent'),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard, // Register RolesGuard globally
    },
  ],
})
export class AppModule {}
