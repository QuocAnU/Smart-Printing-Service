import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { SignupDto } from './DTO/signup.dto';
import { LoginDto } from './DTO/login.dto';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async create(dto: SignupDto) {
    let hastPw = await argon.hash(dto.Password);
    const createdUser = new this.userModel({
      FullName: dto.Fullname,
      Email: dto.Email,
      BKNetID: dto.BKNetID,
      hashString: hastPw,
      PaperBalance: 8,
      StuID: dto.StuID,
      isNew: true,
    });
    let newUser;
    try {
      newUser = await createdUser.save();
      let rtInfor = dto;
      delete rtInfor.Password;
      rtInfor['msg'] = 'Sign in success';
      return rtInfor;
    } catch (err) {
      if (err.code === 11000) {
        return { msg: 'StuID or BKNetID was used!' };
      } else {
        return err;
      }
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  //BKNetID is username at this context
  async findUserByUsername(dto: LoginDto) {
    let user = await this.userModel.findOne({ BKNetID: dto.BKNetID });
    return user;
  }
  public async findUserById(id) {
    const user = await this.userModel.findOne({ _id: id });
    return user;
  }
}
