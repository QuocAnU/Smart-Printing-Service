import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import {FileP} from './File.schema'
import { User } from './user.schema';

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

  @Prop({required:true,enum: { values: ['Idle', 'Printing', 'Error'], message: '{VALUE} is not supported' }})
  PrinterStatus: string //isIn: ['Idle', 'Printing', 'Error']
  
  @Prop([{type: mongoose.Schema.Types.ObjectId, ref: 'FileP'}])
  PrinterQueue: FileP[];

  @Prop({default: '0.0.0.0'})
  IPAddress: string;

  @Prop({default:'255.255.0.0'})
  IPMask: string;
  
  @Prop({methods: Function})
  AddToQueue: Function;

  @Prop({methods: Function})
  GetLength: Function;

  @Prop({methods: Function})
  GetTop: Function;

  @Prop({methods: Function})
  Pop: Function;

  @Prop({methods: Function})
  Enable: Function;

  @Prop({methods: Function})
  Disable: Function;

  @Prop({methods: Function})
  UpdateStatus: Function;

  @Prop({methods: Function})
  UpdateLocation: Function;
}

export const UserSchema = SchemaFactory.createForClass(Printer);
UserSchema.methods.AddToQueue = async function (object: FileP){
  this.PrinterQueue.push(object);
};

UserSchema.methods.GetLength = async function (): Promise<Number> {
  return this.PrinterQueue.length;
}

UserSchema.methods.GetTop = async function (): Promise<FileP> {
  return this.PrinterQueue[0];
}

UserSchema.methods.Pop = async function (): Promise<FileP> {
  var Top = this.PrinterQueue[0];
  this.PrinterQueue.shift();
  return Top;
}

UserSchema.methods.Enable = async function (){
  this.Enabled = true;
}

UserSchema.methods.Disable = async function (){
  this.Enabled = false;
}

UserSchema.methods.UpdateLocation = async function (Campus: string, Building: string, Room: string) {
  this.CampusLocation = (Campus==undefined?this.CampusLocation:Campus);
  this.BuildingLocation = (Building==undefined?this.BuildingLocation:Building);
  this.RoomLocation = (Room==undefined?this.RoomLocation:Room);
}
