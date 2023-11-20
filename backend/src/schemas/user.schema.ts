import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop(
    {
      required: true,
      index: true,
      unique: true,
      maxlength: 200,
      lowercase: true
    })
  BKNetID: string;

  @Prop({
      required: true,
      // unique: true,
      lowercase: true,
      maxLength: 200,
  })
  Email: string;

  @Prop({
    required: true,
  })
  hashString: string;

  @Prop({
    // required: true,
    maxLength: 120,
  })
  FullName: string;

  @Prop({
    minLength: 7,
    maxLength: 7,
    // required: true,
    // unique: true,
  })
  StuID: string;

  @Prop({
    required: true
  })
  PaperBalance: number;



}

export const UserSchema = SchemaFactory.createForClass(User);