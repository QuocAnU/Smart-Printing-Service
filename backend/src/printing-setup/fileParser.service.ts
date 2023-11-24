import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'file-system';
import * as PDFParser from 'pdf-parse';
import * as mammoth from 'mammoth';
@Injectable()
export class FileParser {
  /**
   *
   */
  constructor(private readonly config: ConfigService) {}

  async getPdfInfo(filename: string): Promise<number> {
    const dataBuffer = fs.readFileSync(
      this.config.get('UPLOAD_DIR') + '/' + filename,
    );
    const pdfData = await PDFParser(dataBuffer);
    return pdfData;
  }
  async getDocInfo(filename: string): Promise<number> {
    const dataBuffer = fs.readFileSync(
      this.config.get('UPLOAD_DIR') + '/' + filename,
    );
    const result = await mammoth.extractRawText({ arrayBuffer: dataBuffer });

    // Count the number of pages (you might need to adjust this based on your specific document)
    const numPages = result.value
      .split('\n')
      .filter((line) => line.trim() !== '').length;

    return numPages;
  }
}
