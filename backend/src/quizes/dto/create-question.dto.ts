import { IsString, IsArray, IsNumber, Min, Max, IsOptional } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  text: string;

  @IsArray()
  @IsString({ each: true })
  options: string[];

  @IsString()
  correctAnswer: string;

  @IsNumber()
  @Min(1)
  @Max(3)
  difficulty: number;

  @IsString()
  @IsOptional()
  explanation?: string;
}
