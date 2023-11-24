import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { FilePDocument } from "src/schemas/File.schema";
import { FileParser } from "src/printing-setup/fileParser.service";
import { PrintConfigDto } from "src/Account/DTO";

@Injectable()
export class FilePService {
  /**
   *
   */
  constructor(
    @InjectModel("FileP") private filePModel: Model<FilePDocument>,
    private fileParser: FileParser,
  ) {}

  async createFileP(file, user, dto: PrintConfigDto) {
    let fileData = await this.fileParser.getPdfInfo(file.filename);
    const newFileP = new this.filePModel({
      name: file.filename,
      filePath: file.destination + "/" + file.filename,
      Owner: user,
      PaperSize: dto.PaperSize,
      TwoSide: dto.IsTwoSide,
      CopyNum: dto.NumberCopy,
      FileNumberOfPage: fileData["pagesnumber"],
    });
    console.log(fileData);
    return newFileP;
  }
  async saveFileP(filePDoc: FilePDocument) {
    return filePDoc.save();
  }
  async findFileP(user) {
    return await this.filePModel.findOne({
      Owner: { _id: user["_id"] },
    });
  }
}
