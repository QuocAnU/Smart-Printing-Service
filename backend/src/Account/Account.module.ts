import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthService } from "./Account.auth.service";
import { AccountController } from "./Account.controller";
import { UserSchema } from "src/schemas/user.schema";
import { UserService } from "./user.service";
import { JwtStrategy } from "./strategy";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        // PassportModule.register({defaultStrategy: 'jwt'}),
        // JwtModule.registerAsync({}),
        JwtModule.register({}),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
    ],
    controllers: [AccountController],
    providers: [AuthService, UserService, JwtStrategy],
})
export class AccountModule {

}