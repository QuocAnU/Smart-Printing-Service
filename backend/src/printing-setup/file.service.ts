import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { FilePDocument } from "src/schemas/File.schema";
import { PrintConfigDto } from "src/Account/DTO";
import { ConfigService } from "@nestjs/config";
import * as fs from "file-system";
import * as groupdocs from "groupdocs-conversion-cloud";
import * as ftp from "basic-ftp";
import * as pdf from "pdf-parse";
@Injectable()
export class FilePService {
    constructor(
        @InjectModel("FileP") private filePModel: Model<FilePDocument>,
        private readonly configService: ConfigService,
    ) {}

    async createFileP(filename, user, dto: PrintConfigDto) {
        let fileData = await this.getPdfInfo(filename);
        const newFileP = new this.filePModel({
            name: filename,
            filePath: this.configService.get("UPLOAD_DIR") + "/" + filename,
            Owner: user,
            PaperSize: dto.PaperSize,
            TwoSide: dto.IsTwoSide,
            CopyNum: dto.NumberCopy,
            FileNumberOfPage: fileData["numpages"],
        });
        return newFileP;
    }
    async saveFileP(filePDoc: FilePDocument): Promise<FilePDocument> {
        return filePDoc.save();
    }
    async findFilePByUser(user) {
        return await this.filePModel.findOne({
            Owner: { _id: user["_id"] },
        });
    }
    async findFilePById(id) {
        return this.filePModel.findById(id);
    }
    async transferFileToPdf(filename: string, username: string): Promise<String> {
        //config api
        try {
            const config = new groupdocs.Configuration(
                this.configService.get("GROUP_DOCS_ID"),
                this.configService.get("GROUP_DOCS_SECRECT"),
            );
            config.apiBaseUrl = this.configService.get("GROUP_DOCS_BASE_URL");

            //upload file to api cloud
            let resourcesFolder = this.configService.get("UPLOAD_DIR") + "/" + filename;
            fs.readFile(resourcesFolder, async (err, fileStream) => {
                try {
                    let fileApi = groupdocs.FileApi.fromConfig(config);
                    // create upload request
                    let request = new groupdocs.UploadFileRequest(filename, fileStream, "uploads");
                    await fileApi.uploadFile(request);
                } catch (error) {
                    console.log(error);
                    throw error;
                }
                // construct FileApi
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
            let pdf_filename =
                (filename.substring(0, filename.lastIndexOf(".")) || filename) + ".pdf";
            let request = new groupdocs.DownloadFileRequest("output/" + pdf_filename, "uploads");
            let response = await fileApi.downloadFile(request);

            await fs.writeFile(
                this.configService.get("UPLOAD_DIR") + "/" + pdf_filename,
                response,
                "binary",
                function (err) {},
            );

            await fs.unlink(this.configService.get("UPLOAD_DIR") + "/" + filename, function (err) {
                if (err) throw err;
            });
            return pdf_filename;
        } catch (err) {
            console.log(err);
            throw new HttpException("Convert to Pdf fail!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async uploadToPrintServer(filename) {
        const client = new ftp.Client(60000);
        //connect to fpt server
        client.ftp.verbose = true;
        try {
            let ftpResp = await client.access({
                host: "conganhluan.com",
                user: "btl-cnpm@conganhluan.com",
                password: "btl-cnpm123",
                secureOptions: {},
            });
            console.log("connect succeess");
            await client.ensureDir("btl_cnpm_store_fileP");
            let pwd = await client.pwd();
            await client.uploadFrom(
                this.configService.get("UPLOAD_DIR") + "/" + filename,
                pwd + "/" + filename,
            );
            let file_list = await client.list();
            for (const file of file_list) {
                console.log(file);
            }

            await client.remove(pwd + "/" + filename);
        } catch (err) {
            //TODO: throw a HTTP response instead
            throw err;
        }

        client.close();
    }
    async getPdfInfo(filename) {
        const filePath = this.configService.get("UPLOAD_DIR") + "/" + filename;
        let dataBuffer = fs.readFileSync(filePath);
        return pdf(dataBuffer);
    }
    async deleteAllFileP() {
        await this.filePModel.deleteMany({});
    }
    async deletFileP(id) {
        await this.filePModel.deleteOne({ _id: id });
    }
}
