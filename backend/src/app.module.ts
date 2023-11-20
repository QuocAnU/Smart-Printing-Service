import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from './AccountController/Account.module';

@Module({
  imports: [AccountModule],//MongooseModule.forRoot('mongodb://127.0.0.1:27017'),],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}

