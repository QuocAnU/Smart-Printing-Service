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
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { JwtGuard } from "src/Account/guard";
import { Request } from "express";
import { PrintConfigDto } from "src/Account/DTO";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { FilePService } from "./file.service";
import { PrinterService } from "./printer.service";
import { PrinterDto, PrinterLocationDto } from "src/Account/DTO/printer.dto";
import { UserService } from "src/Account/user.service";
import { userInfo } from "os";
import mongoose, { Mongoose } from "mongoose";
import { PrinterSchedulerService } from "./printerScheduler.service";
import { Http2ServerResponse } from "http2";

@Controller("printing-setup")
export class PrintingSetupController {
    public upload_dir: string;
    constructor(
        private fileService: FilePService,
        @Inject(CACHE_MANAGER)
        private cacheManager: Cache,
        private printerService: PrinterService,
        private userService: UserService,
        private printerScheService: PrinterSchedulerService,
    ) {
        this.fileService.deleteAllFileP().then(() => {
            console.log("Deleted all file");
        });
        this.printerScheService
            .startAllPrinter()
            .then((rs) => {})
            .catch((err) => {
                throw err;
            });
    }

    @Post("upload")
    @UseGuards(JwtGuard)
    @UseInterceptors(
        FileInterceptor("file", {
            storage: diskStorage({
                destination: "uploads",
                filename: function (req, file, cb) {
                    let file_comps = file.originalname.split(".");
                    cb(null, file_comps[0] + "_" + req.user["BKNetID"] + "." + file_comps[1]);
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
        //TODO: call convert to pdf: fileName
        if (file.mimetype != "application/pdf") {
            let pdf_filename = undefined;
            try {
                pdf_filename = await this.fileService.transferFileToPdf(file.filename);
            } catch (error) {
                throw error;
            }
            await this.cacheManager.set(req.user["BKNetID"], pdf_filename, 2000000);
            return {
                message: `Upload ${pdf_filename} success.`,
            };
        } else {
            await this.cacheManager.set(req.user["BKNetID"], file.filename, 2000000);
            return {
                message: `Upload ${file.filename} success.`,
            };
        }
    }

    @UseGuards(JwtGuard)
    @Post("setup-config")
    async sendSetupConfig(
        @Req()
        req: Request,
        @Body()
        dto: PrintConfigDto,
    ) {
        try {
            let file_name = await this.cacheManager.get(req.user["BKNetID"]);
            if (file_name == null)
                throw new HttpException("Not uploaded file yet!", HttpStatus.FORBIDDEN);
            await this.cacheManager.del(req.user["BKNetID"]);
            let newFileP = await this.fileService.createFileP(file_name, req.user, dto);

            const userPaperBalance = req.user["PaperBalance"];

            if (dto.IsTwoSide) {
                if (Math.floor(newFileP.FileNumberOfPage / 2) > userPaperBalance)
                    throw new HttpException("Not enough pasge!", HttpStatus.FORBIDDEN);
            } else {
                if (newFileP.FileNumberOfPage > userPaperBalance)
                    throw new HttpException("Not enough page!", HttpStatus.FORBIDDEN);
            }
            //
            let post_file = await this.fileService.saveFileP(newFileP);
            let newUserPaperBalance = dto.IsTwoSide
                ? req.user["PaperBalance"] - Math.floor(newFileP.FileNumberOfPage / 2)
                : req.user["PaperBalance"] - newFileP.FileNumberOfPage;
            let ownerInfor = await this.userService.updateUserPaperBalance(
                req.user["BKNetID"],
                newUserPaperBalance,
            );
            let rtPostFileInfor = post_file.toObject({ versionKey: true, virtuals: false });
            delete rtPostFileInfor["Owner"]["hashString"];
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
        try {
            //TODO: check printer status
            const chosenPrinter = await this.printerService.getPrinterStatus(dto);
            if (chosenPrinter == null)
                throw new HttpException(
                    "Can not find printer in that location",
                    HttpStatus.FORBIDDEN,
                );

            //TODO: add fileP to chosen printer queue
            const user_fileP = await this.fileService.findFilePByUser(req.user);
            this.printerService.addQueue(user_fileP, chosenPrinter);
            //TODO: chosen printer FileP do not change
            return {
                message: `${user_fileP.name} was sent to ${chosenPrinter.Brand} ${chosenPrinter.PrinterModel}.`,
            };
        } catch (error) {
            throw error;
        }
    }
    private isRunning = false;
    @Get("print")
    async printAtPrinter() {
        try {
            if (this.isRunning) return;
            this.isRunning = true;
            this.printerScheService.startPrintForPrinter("65699c171525b7a109a9799d");
        } catch (error) {
            throw new HttpException(error, HttpStatus.AMBIGUOUS);
        }
    }
    @Post("create-printer")
    async createPrinter(
        @Body()
        dto: PrinterDto,
    ) {
        try {
            let newPrinter = await this.printerService.createPrinter(dto);
            return newPrinter;
        } catch (error) {
            throw new HttpException(error, HttpStatus.AMBIGUOUS);
        }
    }
    @Get("get-list-printer")
    async getListPrinter() {
        try {
            let allPrinter = await this.printerService.getAllPrinter();
            return allPrinter;
        } catch (error) {
            throw new HttpException(error, HttpStatus.AMBIGUOUS);
        }
    }
}
