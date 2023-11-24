import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrinterDocument } from "src/schemas/printer.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PrinterLocationDto } from "src/Account/DTO/printer.dto";

@Injectable()
export class PrinterService {
  /**
   *
   */
  constructor(
    @InjectModel("Printer")
    private readonly printerModel: Model<PrinterDocument>,
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
  addQueue(file, printer: PrinterDocument) {
    if (printer.PrinterStatus == "Idle") printer.PrinterStatus = "Printing";
    return printer.AddToQueue(file);
  }
  async getLength(printer: PrinterDocument) {
    return printer.GetQueueLength();
  }
  async getPrinterStatus(_location: PrinterLocationDto) {
    let printers;
    try {
      printers = await this.printerModel.find({ location: _location });
      console.log(printers[0]);
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
}
