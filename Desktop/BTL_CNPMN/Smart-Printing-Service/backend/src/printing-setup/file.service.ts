import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { FilePDocument } from "src/schemas/File.schema";
import { FileParser } from "src/printing-setup/fileParser.service";
import { PrintConfigDto } from "src/Account/DTO";
import { ConfigService } from "@nestjs/config";
import * as fs from "file-system";
import * as groupdocs from "groupdocs-conversion-cloud";

@Injectable()
export class FilePService {
  constructor(
    @InjectModel("FileP") private filePModel: Model<FilePDocument>,
    private fileParser: FileParser,
    private readonly configService: ConfigService,
  ) {}

  async createFileP(filename, user, dto: PrintConfigDto) {
    let file = fs.readFileSync(this.configService.get("UPLOAD_DIR") + "/" + filename);
    let fileData = await this.fileParser.getPdfInfo(file);
    const newFileP = new this.filePModel({
      name: filename,
      filePath: this.configService.get("UPLOAD_DIR") + "/" + filename,
      Owner: user,
      PaperSize: dto.PaperSize,
      TwoSide: dto.IsTwoSide,
      CopyNum: dto.NumberCopy,
      FileNumberOfPage: fileData["pagesnumber"],
    });

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
  async transferFileToPdf(filename: string): Promise<String> {
    //config api
    const config = new groupdocs.Configuration(
      this.configService.get("GROUP_DOCS_ID"),
      this.configService.get("GROUP_DOCS_SECRECT"),
    );
    config.apiBaseUrl = this.configService.get("GROUP_DOCS_BASE_URL");

    //upload file to api cloud
    let resourcesFolder = this.configService.get("UPLOAD_DIR") + "/" + filename;
    fs.readFile(resourcesFolder, (err, fileStream) => {
      // construct FileApi
      let fileApi = groupdocs.FileApi.fromConfig(config);
      // create upload request
      let request = new groupdocs.UploadFileRequest(filename, fileStream, "uploads");
      fileApi.uploadFile(request);
    });

    //convert to pdf
    let converApi = groupdocs.ConvertApi.fromKeys(
      this.configService.get("GROUP_DOCS_ID"),
      this.configService.get("GROUP_DOCS_SECRECT"),
    );

    let settings = new groupdocs.ConvertSettings();
    settings.filePath = filename;
    settings.format = "pdf";
    settings.outputPath = "output";

    let up_request = new groupdocs.ConvertDocumentRequest(settings);
    let rs = await converApi.convertDocument(up_request);
    console.log("Document converted successfully: " + rs[0].url);

    //download the converted file
    // construct FileApi
    let fileApi = groupdocs.FileApi.fromConfig(config);
    // download file request
    let pdf_filename = (filename.substring(0, filename.lastIndexOf(".")) || filename) + ".pdf";
    let request = new groupdocs.DownloadFileRequest("output/" + pdf_filename, "uploads");
    let response = await fileApi.downloadFile(request);

    await fs.writeFile(
      this.configService.get("UPLOAD_DIR") + "/" + pdf_filename,
      response,
      "binary",
      function (err) {},
    );

    fs.unlink(this.configService.get("UPLOAD_DIR") + "/" + filename, function (err) {
      if (err) throw err;
    });
    return pdf_filename;
  }
}
