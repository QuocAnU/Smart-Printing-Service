import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";

import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { JwtGuard } from "src/Account/guard";
import { Request } from "express";

import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { FilePService } from "src/printing-setup/file.service";
import { PrinterService } from "src/printing-setup/printer.service";

import { UserService } from "src/Account/user.service";
import { userInfo } from "os";
import mongoose, { Mongoose } from "mongoose";
import { AdminService } from "./Admin.service";
import { Http2ServerResponse } from "http2";
@Controller('admin')

export class AdminController {
  constructor(private adminService: AdminService) {}
  @Post('getlog')
  async get_log_from_user(@Req() req){
    return this.adminService.get_log(req.body["username"])

  }
}
