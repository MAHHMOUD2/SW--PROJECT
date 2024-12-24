import { IsString, IsArray, IsOptional } from 'class-validator';

export class CreateModuleDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsArray()
  @IsOptional()
  keywords?: string[];
}
