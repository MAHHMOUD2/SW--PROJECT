<<<<<<< HEAD
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserModel } from './user.model'; // Assuming you have a User model that interfaces with MongoDB

@Injectable()
export class UserService {
  constructor(private readonly userModel: UserModel) {}

  async create(registerDto: any) {
    const { username, password } = registerDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({
      username,
      password: hashedPassword,
      role: 'student', // Default role, can be adjusted as per requirements
    });
    return user.save();
  }

  async validateUser(loginDto: any) {
    const { username, password } = loginDto;
    const user = await this.userModel.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }
}
=======
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
  //hi

  async create(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async update(id: string, updateData: Partial<User>): Promise<User> {
    await this.userRepository.update(id, updateData);
    return this.findOneById(id);
  }

  async delete(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}

>>>>>>> 4ebe373b1eb818a75ee7721ea19842862997d22e
