import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './Account.auth.service';
import { LoginDto } from './DTO/login.dto';
import { SignupDto } from './DTO/signup.dto';
import { HttpStatus } from '@nestjs/common';
import { ValidationPipe } from './DTO/validation.pipe';

@Controller('acc')
export class AccountController {
  constructor(private accService: AuthService) {}
  @Post('login') //  /auth/signin
  login(@Body(new ValidationPipe()) dto: LoginDto) {
    return this.accService.login(dto);
  }
  @Post('signup') //  /auth/signup
  signup(@Body(new ValidationPipe()) dto: SignupDto) {
    return this.accService.signup(dto);
  }
}
