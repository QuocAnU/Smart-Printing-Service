import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from '../app.service';
import {AccountService} from 'src/AccountController/Account.service'
import { HttpStatus } from '@nestjs/common';
@Controller()
export class AccountController {
  constructor(private readonly accService: AccountService) {}
    @Post("/login")
    async SignIn(@Res() response) {
      return response.status(HttpStatus.OK).json("hehe");
  }


}