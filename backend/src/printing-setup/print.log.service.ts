import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PrintLogDocument } from "src/schemas/Log.schema";
import { PrinterService } from "./printer.service";

@Injectable({})
export class PrintLogService {
    constructor(@InjectModel("PrintLog") private readonly model: Model<PrintLogDocument>) {}

    async createNewPrintLog(user, printer, _timeStart: string, _numPrintedPge) {
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
        let newPrLog = await this.model.create({
            timeStart: _timeStart,
            timeEnd: datetime,
            Owner: user,
            Printer: printer,
            numPrintedPage: _numPrintedPge,
        });
        return newPrLog.save();
    }
    async get_log(_id: string) {
        let ret = await this.model.find({ Owner: _id });
        let userLogList = [];
        for (let index = 0; index < ret.length; index++) {
            userLogList.push(ret[index].toObject());
        }
        for (let index = 0; index < userLogList.length; index++) {
            delete userLogList[index]["_id"];
        }
        return userLogList;
    }
}
