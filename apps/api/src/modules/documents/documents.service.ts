import { Injectable } from '@nestjs/common';

import { DocumentsRepository } from './repositories/documents.repository';
import type { Document } from './types/document.types';

@Injectable()
export class DocumentsService {
  constructor(private readonly documentsRepository: DocumentsRepository) {}

  getDocuments(): Document[] {
    return this.documentsRepository.getDocuments();
  }
}
