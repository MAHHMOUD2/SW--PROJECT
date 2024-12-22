import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QuizDto } from '../dto/quizzes.dto'; 
import { Quiz, QuizDocument } from '../models/quizzes.schema'; 
import { DeleteResult } from 'mongodb';
import { Model } from 'mongoose';

@Injectable()
export class QuizzesService {
  constructor(@InjectModel(Quiz.name) private quizModel: Model<QuizDocument>) {}

  Add(body: QuizDto) {
    return this.quizModel.create(body);
  }

  FindAll() {
    return this.quizModel.find();
  }

  async FindOne(quiz_Id: string) {
    const data = await this.quizModel.findOne({ quiz_Id });
    return { message: 'Data retrieved successfully', data };
  }

  Update(quiz_Id: string, body: QuizDto) {
    return this.quizModel.findOneAndUpdate(
      { quiz_Id },
      { $set: body },
      { new: true },
    );
  }

  Delete(quiz_Id: string): Promise<DeleteResult> {
    return this.quizModel.deleteOne({ quiz_Id }).exec();
  }

  Search(key: string): Promise<QuizDocument[]> {
    const query = {
      $or: [
        { quiz_Id: { $regex: key, $options: 'i' } },
        { module_Id: { $regex: key, $options: 'i' } },
        { questions: { $regex: key, $options: 'i' } },
      ],
    };
    return this.quizModel.find(query).exec();
  }
}
