import {
    IsNotEmpty,
    IsString,
    IsArray,
    IsDateString,
    IsOptional,
  } from 'class-validator';
  
  export class QuizDto {
    @IsNotEmpty()
    @IsString()
    quiz_Id: string;
  
    @IsNotEmpty()
    @IsString()
    module_Id: string;
  
    @IsNotEmpty()
    @IsArray()
    questions: {
      questionText: string;
      options: string[];
      correctAnswer: string;
    }[];
  
    @IsOptional()
    @IsDateString()
    created_at: Date;
  }
  