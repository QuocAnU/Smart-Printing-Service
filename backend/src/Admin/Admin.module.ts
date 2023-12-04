import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AdminController } from "./Admin.controller";
import { UserSchema } from "src/schemas/user.schema";
import { PrintLogSchema } from "src/schemas/Log.schema";
import { AdminService } from "./Admin.service";
import { JwtModule } from "@nestjs/jwt";


@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: "User",
                schema: UserSchema,
            },
            {
                name: "PrintLog",
                schema: PrintLogSchema
            }
        ]),
    ],
    controllers: [AdminController],
    providers: [AdminService],
    exports: [AdminService],
})
export class AdminModule {}
