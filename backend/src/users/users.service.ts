import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.schema';
import { Course } from './courses.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Course') private readonly courseModel: Model<Course>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email, isActive: true }).exec();
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id, isActive: true }).exec();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    return user.save();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    return this.userModel.findByIdAndUpdate(
      id,
      { ...updateUserDto, updatedAt: new Date() },
      { new: true }
    ).exec();
  }

  async delete(id: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(id, { isActive: false }).exec();
  }

  async getEnrolledCourses(userId: string): Promise<Course[]> {
    const user = await this.userModel
      .findById(userId)
      .populate('enrolledCourses')
      .exec();
    return user.enrolledCourses;
  }

  async getCompletedCourses(userId: string): Promise<Course[]> {
    const user = await this.userModel
      .findById(userId)
      .populate('completedCourses')
      .exec();
    return user.completedCourses;
  }

  async searchStudents(query: string): Promise<User[]> {
    return this.userModel.find({
      role: 'student',
      isActive: true,
      $or: [
        { firstName: { $regex: query, $options: 'i' } },
        { lastName: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
      ],
    }).exec();
  }

  async searchInstructors(query: string): Promise<User[]> {
    return this.userModel.find({
      role: 'instructor',
      isActive: true,
      $or: [
        { firstName: { $regex: query, $options: 'i' } },
        { lastName: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
      ],
    }).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find({ isActive: true }).exec();
  }
}
