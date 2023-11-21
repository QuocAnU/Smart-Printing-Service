import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail } from 'class-validator';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    required: true,
    index: true,
    unique: true,
    lowercase: true,
  })
  BKNetID: string;

  @Prop({
    required: true,
  })
  Email: string;

  @Prop({
    required: true,
  })
  hashString: string;

  @Prop({
    maxLength: 120,
  })
  FullName: string;

  @Prop({
    required: true,
    unique: true,
  })
  StuID: string;

  @Prop({
    required: true,
  })
  PaperBalance: number;
}
export const UserSchema = SchemaFactory.createForClass(User);
