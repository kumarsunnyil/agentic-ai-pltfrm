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
