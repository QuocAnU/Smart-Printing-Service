import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './DTO/login.dto';
import { SignupDto } from './DTO/signup.dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';

@Injectable({})
export class AuthService {
  constructor(
    private userService: UserService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: SignupDto): Promise<{}> {
    let newUser;
    newUser = await this.userService.create(dto);
    return newUser;
  }

  async login(dto: LoginDto): Promise<any> {
    //find user BKNetID
    const user = await this.userService.findUserByUsername(dto);
    //
    if (!user) {
      throw new ForbiddenException('Username does not exists!');
    }
    //waiting argon for verify password and user hastring
    let isPasswordMatched = await argon.verify(user.hashString, dto.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid password!');
    }
    //if passwork match, attach a JWT for the next request
    return this.signinToken(user.BKNetID, user.id);
  }
  async signinToken(username: string, userId: number) {
    const payload = {
      sub: userId,
      username,
    };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET'),
    });
    return {
      access_token: token,
      msg: 'signin success',
    };
  }
}
