/**
 * ------------------------------------------------------------
 * @file: src\modules\documents\documents.service.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 06-10-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { basename, extname } from 'node:path';
import { unlink } from 'node:fs/promises';

import { DocumentsRepository } from './repositories/documents.repository';
import type { Document } from './types/document.types';

@Injectable()
export class DocumentsService {
  constructor(private readonly documentsRepository: DocumentsRepository) {}

  async getDocuments(): Promise<Document[]> {
    return this.documentsRepository.findAll();
  }

  async countDocuments(): Promise<number> {
    return this.documentsRepository.count();
  }

  async uploadDocument(file: Express.Multer.File, uploadedBy: string): Promise<Document> {
    if (!file) {
      throw new BadRequestException('A document file is required');
    }

    const originalName = basename(file.originalname)
      .replace(/[\r\n\0]/g, '')
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

      throw new BadRequestException('Unsupported document type. Allowed types: PDF, DOCX, TXT');
    }

    try {
      return await this.documentsRepository.createUploadedDocument({
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
    } catch (error) {
      // Remove the saved file if metadata cannot be persisted.
      await unlink(file.path).catch(() => undefined);
      throw error;
    }
  }
}
