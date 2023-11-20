import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from './Account/Account.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AccountModule,
  MongooseModule.forRoot('mongodb+srv://duy:vlUd1zZUl3TwK922@cluster0.zqrgg5g.mongodb.net/?retryWrites=true&w=majority'),
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
