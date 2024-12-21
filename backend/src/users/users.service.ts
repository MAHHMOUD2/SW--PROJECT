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
