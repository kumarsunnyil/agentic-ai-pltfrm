/**
 * ------------------------------------------------------------
 * @file: src\modules\documents\documents.controller.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 06-10-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

import { Controller, Get } from '@nestjs/common';

import { DocumentsService } from './documents.service';
import type { Document } from './types/document.types';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get()
  async getDocuments(): Promise<Document[]> {
    return this.documentsService.getDocuments();
  }
}
