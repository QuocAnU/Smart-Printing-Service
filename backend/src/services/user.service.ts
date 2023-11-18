import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(): Promise<User> {
    const createdUser = new this.userModel({BKNetID: 'conchym'});
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async findUserByID(username: string): Promise<User | undefined> {
    return this.userModel.findOne(User => User.BKNetID === username);
  }
}
