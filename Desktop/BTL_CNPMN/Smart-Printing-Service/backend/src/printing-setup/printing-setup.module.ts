import { Module } from "@nestjs/common";
import { PrintingSetupController } from "./printing-setup.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { PrinterSchema } from "src/schemas/printer.schema";
import { FileParser } from "./fileParser.service";
import { CacheModule } from "@nestjs/cache-manager";
import { FilePService } from "./file.service";
import { FilePSchema } from "src/schemas/File.schema";
import { PrinterService } from "./printer.service";

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
    CacheModule.register(),
  ],
  controllers: [PrintingSetupController],
  providers: [FileParser, FilePService, PrinterService],
})
export class PrintingSetupModule {}
