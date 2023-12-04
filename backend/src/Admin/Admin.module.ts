import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AdminController } from "./Admin.controller";
import { UserSchema } from "src/schemas/user.schema";
import { JwtModule } from "@nestjs/jwt";
import { PrintingSetupModule } from "src/printing-setup/printing-setup.module";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: "User",
                schema: UserSchema,
            },
            {
                name: "PrintLog",
                schema: PrintLogSchema,
            },
        ]),
        PrintingSetupModule,
    ],
    controllers: [AdminController],
    providers: [],
})
export class AdminModule {}
export class AdminModule {}
