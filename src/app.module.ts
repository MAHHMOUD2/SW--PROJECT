import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizzesModule } from './quizzes/quizzes.module';
import { ResponsesModule } from './responses/responses.module';

@Module({
  imports: [
    // Load environment variables globally
    ConfigModule.forRoot({
      isGlobal: true, // Allows ConfigModule to be used globally
    }),

    // Configure Mongoose for MongoDB connection
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/interactive-modules'),

    // Import feature modules
    QuizzesModule,
    ResponsesModule,
  ],
})
export class AppModule {}
