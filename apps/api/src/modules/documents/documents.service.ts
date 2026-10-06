/**
 * ------------------------------------------------------------
 * @file: src\modules\documents\documents.service.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 06-10-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

import { Injectable } from '@nestjs/common';

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
}
