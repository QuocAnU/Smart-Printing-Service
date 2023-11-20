import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { SignupDto } from './DTO/signup.dto';
import { LoginDto } from './DTO/login.dto';
import * as argon from "argon2";

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) { }

  async create(dto: SignupDto) {
    let hastPw = await argon.hash(dto.Password);
    const createdUser = new this.userModel({
      FullName: dto.Fullname,
      Email: dto.Email,
      BKNetID: dto.BKNetID,
      hashString: hastPw,
      PaperBalance: 8,
      StuID: "2110913",
    });
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async findUserByID(dto: LoginDto) {
    let user = this.userModel.findOne({ BKNetID: dto.BKNetID });
    return user
  }
}
