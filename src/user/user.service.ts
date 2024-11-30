import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async createUser(userId: string, username: string): Promise<User> {
    const newUser = new this.userModel({ userId, username });
    return newUser.save();
  }
  async getAllUsers(): Promise<User[]> {
    return this.userModel.find();
  }
  async getUserById(userId: string): Promise<User | null> {
    return this.userModel.findOne({ userId });
  }
}
