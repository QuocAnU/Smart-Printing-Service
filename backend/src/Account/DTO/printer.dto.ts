import { Injectable } from "@nestjs/common";
import { IsArray, IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { FileP } from "src/schemas/File.schema";

@Injectable()
export class PrinterDto {
  // @Prop({
  //     required: true,
  //     index: true,
  //     unique: true,
  //     min: 0,
  //   })
  //   ID: number;

  @IsString()
  Brand: string;

  @IsNotEmpty()
  @IsString()
  CampusLocation: string;

  @IsNotEmpty()
  @IsString()
  BuildingLocation: string;

  @IsNotEmpty()
  RoomLocation: string;

  @IsString()
  PrinterModel: string;

  @IsString()
  ShortDescription: string;

  @IsBoolean()
  Enabled: boolean;

  @IsNotEmpty()
  PrinterStatus: string; //isIn: ['Idle', 'Printing', 'Error']

  @IsArray()
  IPAddress: string;

  @IsString()
  IPMask: string;
}

export class PrinterLocationDto {
  @IsNotEmpty()
  @IsString()
  CampusLocation: string;

  @IsNotEmpty()
  @IsString()
  BuildingLocation: string;

  @IsNotEmpty()
  RoomLocation: string;
}
