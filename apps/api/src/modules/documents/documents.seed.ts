/**
 * ------------------------------------------------------------
 * @file: src\modules\documents\documents.seed.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 06-10-2026
 * @project: Enterprise Agentic AI Platform - Documents Seeder file
 * ------------------------------------------------------------
 */

import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DocumentEntity } from './entities/document.entity';

@Injectable()
export class DocumentsSeed implements OnModuleInit {
  constructor(
    @InjectRepository(DocumentEntity)
    private readonly repository: Repository<DocumentEntity>,
  ) {}

  async onModuleInit(): Promise<void> {
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    const count = await this.repository.count();

    if (count > 0) {
      return;
    }

    const now = Date.now();

    const documents: DocumentEntity[] = [
      {
        id: 'doc-001',
        title: 'Enterprise AI Architecture.pdf',
        type: 'PDF',
        createdAt: new Date(now - 10 * 60 * 1000),
        status: 'Indexed',
      },
      {
        id: 'doc-002',
        title: 'Agentic RAG Design Specification.pdf',
        type: 'PDF',
        createdAt: new Date(now - 35 * 60 * 1000),
        status: 'Indexed',
      },
      {
        id: 'doc-003',
        title: 'Enterprise Security Guidelines.docx',
        type: 'DOCX',
        createdAt: new Date(now - 2 * 60 * 60 * 1000),
        status: 'Indexed',
      },
      {
        id: 'doc-004',
        title: 'AI Governance Framework.pdf',
        type: 'PDF',
        createdAt: new Date(now - 5 * 60 * 60 * 1000),
        status: 'Processing',
      },
      {
        id: 'doc-005',
        title: 'Knowledge Management Strategy.docx',
        type: 'DOCX',
        createdAt: new Date(now - 24 * 60 * 60 * 1000),
        status: 'Indexed',
      },
    ];

    await this.repository.save(documents);

    console.log(`Seeded ${documents.length} documents.`);
  }
}
