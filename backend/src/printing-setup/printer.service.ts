import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { PrinterDocument } from "src/schemas/printer.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PrinterLocationDto } from "src/Account/DTO/printer.dto";
import { FilePService } from "./file.service";

import { PrintLogService } from "./print.log.service";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { UserService } from "src/Account/user.service";

@Injectable()
export class PrinterService {
    /**
     *
     */
    constructor(
        @InjectModel("Printer")
        private readonly printerModel: Model<PrinterDocument>,
        private readonly filePService: FilePService,
        private readonly prLogService: PrintLogService,
        private readonly userService: UserService,
    ) {}
    async createPrinter(dto) {
        const newPrinter = new this.printerModel({
            Brand: dto.Brand,

            PrinterModel: dto.PrinterModel,

            ShortDescription: dto.ShortDescription,

            location: {
                CampusLocation: dto["CampusLocation"],
                BuildingLocation: dto.BuildingLocation,
                RoomLocation: dto.RoomLocation,
            },
            Enabled: dto.Enabled,

            PrinterStatus: "Idle",

            PrinterQueue: [],
            IPAddress: dto.IPAddress,

            IPMask: dto.IPMask,
        });
        try {
            const createInfor = await newPrinter.save();
            return createInfor;
        } catch (error) {
            throw error;
        }
    }
    async addQueue(file, printer: PrinterDocument) {
        return printer.AddToQueue(file);
    }
    async getLength(printer: PrinterDocument) {
        return printer.GetQueueLength();
    }
    async getPrinterStatus(_location: PrinterLocationDto) {
        let printers;
        try {
            printers = await this.printerModel.find({ location: _location });
        } catch (error) {
            throw error;
        }
        if (printers == null)
            return new HttpException("Can not find that printer", HttpStatus.NOT_FOUND);
        let count = 0;
        for (let i = 0; i < (await printers).length; i++) {
            if (printers[i].PrinterStatus == "Idle" || printers[i].PrinterStatus == "Printing")
                if (printers[i].GetQueueLength() < 15)
                    //return first printer that can print in that location
                    //TODO: chosen printer must have fileP queue less than 15
                    return printers[i];
        }
    }
    public async getPrinterByID(printerID: string) {
        return this.printerModel.findById(printerID);
    }

    async printInPrinterDoc(printer: PrinterDocument) {
        try {
            //dequeue the first fileP in printer
            let filePId = await printer.Pop();
            await printer.save();
            let fileP = await this.filePService.findFilePById(filePId);
            if (fileP == null) {
                throw Error(`There is no file to print at printer '${printer.PrinterModel}'!`);
            }
            let currentdate = new Date();
            var datetime =
                "" +
                currentdate.getDate() +
                "/" +
                (currentdate.getMonth() + 1) +
                "/" +
                currentdate.getFullYear() +
                " @ " +
                currentdate.getHours() +
                ":" +
                currentdate.getMinutes() +
                ":" +
                currentdate.getSeconds();
            //send file to ftp server
            await this.filePService.uploadToPrintServer(fileP["name"]);
            let user = await this.userService.findUserById(fileP.Owner["_id"].toString());
            //save log
            await this.prLogService.createNewPrintLog(
                user,
                printer,
                datetime,
                fileP.FileNumberOfPage,
                fileP.name,
            );
            await this.filePService.deletFileP(fileP._id);
        } catch (error) {
            throw error;
        }
    }
    async flushOutAllPrinterQueue() {
        return this.printerModel.updateMany({}, { PrinterQueue: [] });
    }
    async getAllPrinter() {
        try {
            const allPrinter = await this.printerModel.find();
            return allPrinter;
        } catch (error) {
            throw error;
        }
    }
}
