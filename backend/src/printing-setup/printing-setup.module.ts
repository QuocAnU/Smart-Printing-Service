import { Module } from "@nestjs/common";
import { PrintingSetupController } from "./printing-setup.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { PrinterSchema } from "src/schemas/printer.schema";
import { CacheModule } from "@nestjs/cache-manager";
import { FilePService } from "./file.service";
import { FilePSchema } from "src/schemas/File.schema";
import { PrinterService } from "./printer.service";
import { AccountModule } from "src/Account/Account.module";
import { PrinterSchedulerService } from "./printerScheduler.service";
import { PrintLogSchema } from "src/schemas/Log.schema";
import { PrintLogService } from "./print.log.service";
import { AdminModule } from "src/Admin/Admin.module";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: "Printer",
                schema: PrinterSchema,
            },
        ]),
        MongooseModule.forFeature([
            {
                name: "FileP",
                schema: FilePSchema,
            },
        ]),
        MongooseModule.forFeature([
            {
                name: "PrintLog",
                schema: PrintLogSchema,
            },
        ]),
        CacheModule.register(),
        AccountModule,
    ],
    controllers: [PrintingSetupController],
    providers: [FilePService, PrinterService, PrinterSchedulerService, PrintLogService],
    exports: [PrintLogService],
})
export class PrintingSetupModule {}
