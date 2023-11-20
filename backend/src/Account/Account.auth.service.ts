import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './DTO/login.dto';
import { SignupDto } from './DTO/signup.dto';
import * as argon from "argon2";
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(private userService: UserService,
    private jwt: JwtService,
    private config: ConfigService) { }

  async signup(dto: SignupDto): Promise<{}> {
    let newUser
    try {
      newUser = await this.userService.create(dto);
    }
    catch (err) {
      throw err
    }
    //TODO: create JWT and add to this request 

    return newUser;
  }

  async login(dto: LoginDto): Promise<any> {
    //find user BKNetID
    const user = await this.userService.findUserByID(dto);
    //
    if (!user) {
      throw new ForbiddenException("Username does not exists!")
    }
    let isPasswordMatched = argon.verify(dto.password, user.hashString);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid password!');
    }
    //TODO: attach JWT to request
    return this.signinToken(user.BKNetID, user.id)
  }
  async signinToken(username: string, userId: number) {
    const payload = {
      sub: userId,
      username,
    }
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: "super-ultra-max-secret",
    })
    return {
      access_token: token,
      msg: 'signin success'
    }
  }
} 