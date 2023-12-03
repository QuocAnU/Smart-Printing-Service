import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserService } from 'src/Account/user.service';
import {User, UserDocument} from 'src/schemas/user.schema'
import { JwtService } from '@nestjs/jwt';
import {PrintLog, PrintLogDocument} from 'src/schemas/Log.schema'
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose'
@Injectable({})
export class AdminService {
  constructor(
    private userService: UserService,
    @InjectModel('PrintLog')
    private readonly printlogModel: Model<PrintLogDocument>,

    @InjectModel('User')
    private readonly userModel: Model<UserDocument>
  ) {}


  async get_log(username:string) {
    let user = await this.userModel.findOne({ BKNetID: username });
    if (user == undefined){
      return []
    }
    return this.printlogModel.find({Owner:user._id})

  }
  
}
