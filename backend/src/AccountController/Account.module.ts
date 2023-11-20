import { Module } from '@nestjs/common';
import { AccountController } from 'src/AccountController/Account.controller';
import { AccountService } from 'src/AccountController/Account.service';

@Module({
  controllers: [AccountController],
  providers: [AccountService]
})
export class AccountModule {}