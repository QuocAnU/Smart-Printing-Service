import { Injectable } from "@nestjs/common";
import { FilePService } from "./file.service";
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
    public isPrinting: object = {};

    async startPrintForPrinter(printerID: string) {
        this.isPrinting[printerID] = false;
        //flush out all file in printer

        setInterval(async () => {
            if (!this.isPrinting[printerID]) {
                this.isPrinting[printerID] = true;
                const printerDoc = await this.printerService.getPrinterByID(printerID);
                try {
                    let rs = await this.printerService.printInPrinterDoc(printerDoc);
                } catch (error) {
                    console.log(error.message);
                }
                this.isPrinting[printerID] = false;
            }
        }, 8000);
    }
    async startAllPrinter() {
        let printerDocList = await this.printerService.getAllPrinter();
        for (let index = 0; index < printerDocList.length; index++) {
            await new Promise<void>((resolve, reject) => {
                setTimeout(() => {
                    console.log(printerDocList[index]);
                    this.startPrintForPrinter(printerDocList[index]["_id"].toString());
                    resolve();
                }, 1000);
            });
        }
    }
}
