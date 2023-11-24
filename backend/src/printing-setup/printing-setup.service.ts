import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PrinterDocument } from 'src/schemas/printer.schema';

@Injectable()
export class PrintingSetupService {
  constructor(
    @InjectModel('Printer') private prtModel: Model<PrinterDocument>,
  ) {}

  createFile() {}
}
