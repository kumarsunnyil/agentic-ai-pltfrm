import { Controller, Get } from '@nestjs/common';

import { DocumentsService } from './documents.service';
import type { Document } from './types/document.types';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get()
  getDocuments(): Document[] {
    return this.documentsService.getDocuments();
  }
}
