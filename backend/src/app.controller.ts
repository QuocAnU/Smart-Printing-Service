import { Controller, Get, Post, Res} from '@nestjs/common';
import { AppService } from './app.service';
import { HttpStatus } from '@nestjs/common';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  lmao(): string{
    return undefined;
  }

}

