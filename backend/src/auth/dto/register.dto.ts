import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({ example: 'user@example.com', description: 'User email address' })
    @IsEmail({}, { message: 'Please provide a valid email address' })
    @IsNotEmpty({ message: 'Email is required' })
    readonly email: string;

    @ApiProperty({ example: 'Password123!', description: 'User password' })
    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @IsNotEmpty({ message: 'Password is required' })
    readonly password: string;

    @ApiProperty({ example: 'John', description: 'User first name' })
    @IsString()
    @IsNotEmpty({ message: 'First name is required' })
    readonly firstName: string;

    @ApiProperty({ example: 'Doe', description: 'User last name' })
    @IsString()
    @IsNotEmpty({ message: 'Last name is required' })
    readonly lastName: string;
}
