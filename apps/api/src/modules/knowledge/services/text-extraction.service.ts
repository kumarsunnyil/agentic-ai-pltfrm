import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { readFile } from 'node:fs/promises';
import { extname } from 'node:path';
import mammoth from 'mammoth';
import { PDFParse } from 'pdf-parse';
import type { ExtractedTextSegment } from '../types/extracted-text-segment.type';

const MAX_EXTRACTED_CHARACTERS = 1_500_000;

@Injectable()
export class TextExtractionService {
  async extractFromFile(filePath: string): Promise<ExtractedTextSegment[]> {
    const extension = extname(filePath).toLowerCase();
    const buffer = await readFile(filePath);

    let segments: ExtractedTextSegment[];

    switch (extension) {
      case '.txt':
        segments = [
          {
            text: buffer.toString('utf8'),
            pageNumber: null,
          },
        ];
        break;

      case '.docx': {
        const result = await mammoth.extractRawText({ buffer });

        segments = [
          {
            text: result.value,
            pageNumber: null,
          },
        ];
        break;
      }

      case '.pdf':
        segments = await this.extractPdf(buffer);
        break;

      default:
        throw new UnprocessableEntityException(
          'Unsupported document type. Supported types are PDF, DOCX, and TXT.',
        );
    }

    const cleanedSegments = segments
      .map((segment) => ({
        ...segment,
        text: segment.text.split(String.fromCharCode(0)).join('').replace(/\r\n/g, '\n').trim(),
      }))
      .filter((segment) => segment.text.length > 0);

    const totalCharacters = cleanedSegments.reduce(
      (total, segment) => total + segment.text.length,
      0,
    );

    if (cleanedSegments.length === 0 || totalCharacters === 0) {
      throw new UnprocessableEntityException(
        'No extractable text was found. Scanned PDFs require OCR, which is not implemented yet.',
      );
    }

    if (totalCharacters > MAX_EXTRACTED_CHARACTERS) {
      throw new UnprocessableEntityException(
        'The extracted text exceeds the current processing limit.',
      );
    }

    return cleanedSegments;
  }

  private async extractPdf(buffer: Buffer): Promise<ExtractedTextSegment[]> {
    const parser = new PDFParse({ data: buffer });

    try {
      const result = await parser.getText();

      return result.pages.map((page) => ({
        text: page.text,
        pageNumber: page.num,
      }));
    } finally {
      await parser.destroy();
    }
  }
}
