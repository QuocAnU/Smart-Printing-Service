import { Injectable } from "@nestjs/common";
import { PrinterService } from "./printer.service";

@Injectable()
export class PrinterSchedulerService {
    /**
     *
     */
    constructor(private readonly printerService: PrinterService) {
        //flush out printer file in the begining
        try {
            this.printerService.flushOutAllPrinterQueue().then((rs) => {});
        } catch (error) {
            throw error;
        }
    }

    async startPrintForPrinter(printerID: string) {
        await setInterval(async () => {
            const printerDoc = await this.printerService.getPrinterByID(printerID);
            try {
                let rs = await this.printerService.printInPrinterDoc(printerDoc);
            } catch (error) {
                console.log(error.message);
            }
        }, 10000);
    }
    async startAllPrinter() {
        let printerDocList = await this.printerService.getAllPrinter();
        for (let index = 0; index < printerDocList.length; index++) {
            console.log(printerDocList[index]);
            await this.startPrintForPrinter(printerDocList[index]["_id"].toString());
        }
        return;
    }
}
