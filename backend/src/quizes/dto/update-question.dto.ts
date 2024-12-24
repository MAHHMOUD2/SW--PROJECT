import { IsString, IsArray, IsNumber, Min, Max, IsOptional, IsBoolean } from 'class-validator';

export class UpdateQuestionDto {
  @IsString()
  @IsOptional()
  text?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  options?: string[];

  @IsString()
  @IsOptional()
  correctAnswer?: string;

  @IsNumber()
  @Min(1)
  @Max(3)
  @IsOptional()
  difficulty?: number;

  @IsString()
  @IsOptional()
  explanation?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
