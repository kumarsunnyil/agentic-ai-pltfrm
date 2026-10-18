/**
 * ------------------------------------------------------------
 * @file: src/modules/documents/documents.service.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 06-10-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { basename, extname } from 'node:path';
import { unlink } from 'node:fs/promises';

import { DocumentIngestionService } from '../knowledge/services/document-ingestion.service';
import { DocumentsRepository } from './repositories/documents.repository';
import type { Document, UploadedDocumentFile } from './types/document.types';

@Injectable()
export class DocumentsService {
  private readonly logger = new Logger(DocumentsService.name);

  constructor(
    private readonly documentsRepository: DocumentsRepository,
    private readonly documentIngestionService: DocumentIngestionService,
  ) {}

  async getDocuments(): Promise<Document[]> {
    return this.documentsRepository.findAll();
  }

  async countDocuments(): Promise<number> {
    return this.documentsRepository.count();
  }

  async uploadDocument(file: UploadedDocumentFile, uploadedBy: string): Promise<Document> {
    if (!file) {
      throw new BadRequestException('A document file is required.');
    }

    const originalName = basename(file.originalname)
      .split('\r')
      .join('')
      .split('\n')
      .join('')
      .split(String.fromCharCode(0))
      .join('')
      .slice(0, 255);

    const extension = extname(originalName).toLowerCase();

    const allowedTypes: Record<string, string> = {
      '.pdf': 'PDF',
      '.docx': 'DOCX',
      '.txt': 'TXT',
    };

    const type = allowedTypes[extension];

    if (!type) {
      await unlink(file.path).catch(() => undefined);

      throw new BadRequestException('Unsupported document type. Allowed types: PDF, DOCX, TXT.');
    }

    try {
      // Save the document metadata first.
      const savedDocument = await this.documentsRepository.createUploadedDocument({
        id: randomUUID(),
        title: originalName || 'Uploaded document',
        type,
        status: 'Uploaded',
        originalName: originalName || 'Uploaded document',
        mimeType: file.mimetype,
        sizeBytes: file.size,
        storageKey: file.filename,
        uploadedBy,
      });

      // Start ingestion without making the upload request
      // wait for text extraction and embedding generation.
      void this.documentIngestionService
        .processDocument(savedDocument.id)
        .catch((error: unknown) => {
          this.logger.error(
            `Background ingestion failed for document ${savedDocument.id}.`,
            error instanceof Error ? error.stack : String(error),
          );
        });

      // Return the saved document to the caller.
      return savedDocument;
    } catch (error: unknown) {
      // Remove the uploaded file if metadata persistence fails.
      await unlink(file.path).catch(() => undefined);
      throw error;
    }
  }
}
