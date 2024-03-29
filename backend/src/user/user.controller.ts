import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/Account/guard';

@Controller('user')
export class UserController {
  @UseGuards(JwtGuard)
  @Get('profile')
  userProfile(@Req() req: Request) {
    return req.user;
  }
}
