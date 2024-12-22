import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResponsesController } from './responses.controller';
import { ResponsesService } from './responses.service';
import { responses, ResponsesSchema } from '../models/responses.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: responses.name, schema: ResponsesSchema }]),
  ],
  controllers: [ResponsesController],
  providers: [ResponsesService],
})
export class ResponsesModule {}
