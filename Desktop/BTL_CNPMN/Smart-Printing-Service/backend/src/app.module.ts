import { Module } from "@nestjs/common";
import { AccountModule } from "./Account/Account.module";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./user/user.module";
import { PrintingSetupModule } from "./printing-setup/printing-setup.module";

@Module({
  imports: [
    AccountModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    MongooseModule.forRoot(
      "mongodb+srv://duy:vlUd1zZUl3TwK922@cluster0.zqrgg5g.mongodb.net/?retryWrites=true&w=majority",
    ),
    PrintingSetupModule,
  ],
})
export class AppModule {}
