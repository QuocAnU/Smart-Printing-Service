import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './Account.auth.service';
import { LoginDto } from './DTO/login.dto';
import { SignupDto } from './DTO/signup.dto';
import { ValidationPipe } from './DTO/validation.pipe';
import { Request } from 'express';
import { JwtGuard } from './guard';
@Controller('acc')
export class AccountController {
  constructor(private userService: AuthService) {}
  @Post('login') //  /auth/signin
  login(@Body(new ValidationPipe()) dto: LoginDto) {
    return this.userService.login(dto);
  }
  @Post('signup') //  /auth/signup
  signup(@Body(new ValidationPipe()) dto: SignupDto) {
    return this.userService.signup(dto);
  }
  @Get('viewPaper')
  @UseGuards(JwtGuard)
  viewPaperLeft(@Req() req: Request) {
    let rt_infor = { PaperBalance: req.user['PaperBalance'] };
    return rt_infor;
  }
}
