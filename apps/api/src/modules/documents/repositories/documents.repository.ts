import { Injectable } from '@nestjs/common';

import type { Document } from '../types/document.types';

@Injectable()
export class DocumentsRepository {
  getDocuments(): Document[] {
    return [
      {
        id: 'doc-001',
        title: 'Enterprise AI Architecture.pdf',
        type: 'PDF',
        time: '10 min ago',
        status: 'Indexed',
      },
      {
        id: 'doc-002',
        title: 'AI Governance Policy.docx',
        type: 'DOCX',
        time: '24 min ago',
        status: 'Indexed',
      },
      {
        id: 'doc-003',
        title: 'Agent Security Guidelines.pdf',
        type: 'PDF',
        time: '41 min ago',
        status: 'Processing',
      },
    ];
  }
}
