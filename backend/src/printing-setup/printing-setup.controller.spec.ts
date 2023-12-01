import { Test } from "@nestjs/testing";
import { FilePService } from "./file.service";
import { PrinterService } from "./printer.service";
import { PrintingSetupController } from "./printing-setup.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { FilePSchema } from "src/schemas/File.schema";
import { CacheModule } from "@nestjs/cache-manager";
import { PrinterSchema } from "src/schemas/printer.schema";

describe("CatsController", () => {
    let printingSetupController;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [PrintingSetupController],
            providers: [FilePService, PrinterService],
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
        }).compile();

        printingSetupController = moduleRef.get(PrintingSetupController);
    });

    describe("findAll", () => {
        it("should return an array of cats", async () => {
            const result = ["test"];

            expect(await printingSetupController.findAll()).toBe(result);
        });
    });
});
