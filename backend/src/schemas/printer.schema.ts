import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import {FileP} from './File.schema'

export type CatDocument = HydratedDocument<Printer>;

@Schema()
export class Printer {
  @Prop({
    required: true,
    index: true,
    unique: true,
    min: 0,
  })
  ID: number;

  @Prop()
  Brand: string;
  
  @Prop()
  PrinterModel: string;

  @Prop()
  ShortDescription: string;

  @Prop({
    required: true
  })
  CampusLocation: string;

  @Prop({
    required: true
  })
  BuildingLocation: string;

  @Prop({
    required: true
  })
  RoomLocation: string;

  @Prop({required: true, default: true})
  Enabled: boolean;

  @Prop({required:true})
  PrinterStatus: string //isIn: ['Idle', 'Printing', 'Error']
  
  @Prop([{type: mongoose.Schema.Types.ObjectId, ref: 'FileP'}])
  PrinterQueue: FileP[];

  @Prop({default: '0.0.0.0'})
  IPAddress: string;

  @Prop({default:'255.255.0.0'})
  IPMask: string;

}

export const UserSchema = SchemaFactory.createForClass(Printer);