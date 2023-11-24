import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';
export type FilePDocument = HydratedDocument<FileP>;
@Schema()
export class FileP {
  // @Prop({ required: true, unique: true, index: true })
  // FileID: number;

  @Prop()
  name: string;

  @Prop()
  filePath: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  Owner: User;

  @Prop({ default: 4 })
  PaperSize: number;

  @Prop([Number])
  PrintedPages: number[];

  @Prop({ default: true })
  TwoSide: boolean;

  @Prop()
  CopyNum: number;

  @Prop()
  FileNumberOfPage: number;
}

export const FilePSchema = SchemaFactory.createForClass(FileP);
