import {
  Body,
  Controller,
  FileTypeValidator,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { JwtGuard } from "src/Account/guard";
import { Request } from "express";
import { FileParser } from "./fileParser.service";
import { PrintConfigDto } from "src/Account/DTO";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { FilePService } from "./file.service";
import { PrinterService } from "./printer.service";
import { PrinterDto, PrinterLocationDto } from "src/Account/DTO/printer.dto";

@Controller("printing-setup")
export class PrintingSetupController {
  public upload_dir: string;
  constructor(
    private fileService: FilePService,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    private printerService: PrinterService,
  ) {}

  @Post("upload")
  @UseGuards(JwtGuard)
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "uploads",
        filename: function (req, file, cb) {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async uploadFile(
    @Req()
    req: Request,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 12000000,
          }),
          new FileTypeValidator({
            fileType: ".(png|jpeg|jpg|pdf|doc|txt)",
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    await this.cacheManager.set(req.user["BKNetID"], file, 2000000);
    return {
      message: `Upload ${file.filename} success.`,
    };
  }

  @UseGuards(JwtGuard)
  @Post("setup-config")
  async sendSetupConfig(
    @Req()
    req: Request,
    @Body()
    dto: PrintConfigDto,
  ) {
    const up_file = await this.cacheManager.get(req.user["BKNetID"]);
    if (up_file == null) throw new HttpException("Not uploaded file yet!", HttpStatus.FORBIDDEN);
    await this.cacheManager.del(req.user["BKNetID"]);
    let newFileP = await this.fileService.createFileP(up_file, req.user, dto);

    const userPaperBalance = req.user["PaperBalance"];

    if (dto.IsTwoSide) {
      if (Math.floor(newFileP.FileNumberOfPage / 2) > userPaperBalance)
        throw new HttpException("Not enough pasge!", HttpStatus.FORBIDDEN);
    } else {
      if (newFileP.FileNumberOfPage > userPaperBalance)
        throw new HttpException("Not enough pasge!", HttpStatus.FORBIDDEN);
    }
    try {
      let post_file = await this.fileService.saveFileP(newFileP);
      return post_file;
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtGuard)
  @Post("set-printer")
  async setPrinter(
    @Req()
    req: Request,
    @Body()
    dto: PrinterLocationDto,
  ) {
    //TODO: check printer status
    const chosenPrinter = await this.printerService.getPrinterStatus(dto);
    if (chosenPrinter == null)
      throw new HttpException("Can not find printer in that location", HttpStatus.FORBIDDEN);

    //TODO: add fileP to chosen printer queue
    const user_fileP = await this.fileService.findFileP(req.user);
    try {
      this.printerService.addQueue(user_fileP, chosenPrinter);
      //TODO: chosen printer FileP do not change
      return {
        message: `${user_fileP.name} was sent to ${chosenPrinter.Brand} ${chosenPrinter.PrinterModel}.`,
      };
    } catch (error) {
      throw error;
    }
  }
  @Post("create-printer")
  async createPrinter(
    @Body()
    dto: PrinterDto,
  ) {
    let newPrinter = await this.printerService.createPrinter(dto);
    return newPrinter;
  }
}
