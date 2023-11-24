import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class PrintConfigDto {
  @IsNumber()
  @IsNotEmpty()
  PaperSize: number;

  @IsBoolean()
  @IsNotEmpty()
  IsTwoSide: boolean;

  @IsNumber()
  @IsNotEmpty()
  NumberCopy: number;
}
