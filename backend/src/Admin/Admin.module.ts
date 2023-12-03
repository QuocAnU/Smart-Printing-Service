import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AdminController } from "./Admin.controller";
import { UserSchema } from "src/schemas/user.schema";
import { AdminService } from "./Admin.service";
import { JwtModule } from "@nestjs/jwt";


@Module({
    imports: [
        JwtModule.register({}),
        MongooseModule.forFeature([
            {
                name: "User",
                schema: UserSchema,
            },
        ]),
    ],
    controllers: [AdminController],
    providers: [AdminService],
    exports: [AdminService],
})
export class AccountModule {}
