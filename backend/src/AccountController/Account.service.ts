import { Injectable, UnauthorizedException } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import {Model} from 'mongoose';
import { UserService } from 'src/services/user.service';

import * as bcrypt from 'bcryptjs';

@Injectable()
export class AccountService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserByID(username);
    if (user?.password !== bcrypt.hash(pass,10)) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result;
  }
}