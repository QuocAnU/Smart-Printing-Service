import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

//just for testing
@Module({
  controllers: [UserController]
})
export class UserModule {}
