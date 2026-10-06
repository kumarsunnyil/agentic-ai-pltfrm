/**
 * ------------------------------------------------------------
 * @file: src\modules\documents\repositories\documents.repository.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 06-08-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DocumentEntity } from '../entities/document.entity';
import type { Document } from '../types/document.types';

@Injectable()
export class DocumentsRepository {
  constructor(
    @InjectRepository(DocumentEntity)
    private readonly repository: Repository<DocumentEntity>,
  ) {}

  async findAll(): Promise<Document[]> {
    const documents = await this.repository.find({
      order: {
        createdAt: 'DESC',
      },
    });

    return documents.map((document) => this.toDomain(document));
  }

  async count(): Promise<number> {
    return this.repository.count();
  }

  private toDomain(document: DocumentEntity): Document {
    return {
      id: document.id,
      title: document.title,
      type: document.type,
      time: this.formatRelativeTime(document.createdAt),
      status: document.status,
    };
  }

  private formatRelativeTime(date: Date): string {
    const diffMs = Date.now() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffMinutes < 1) {
      return 'Just now';
    }

    if (diffMinutes < 60) {
      return `${diffMinutes} min ago`;
    }

    const diffHours = Math.floor(diffMinutes / 60);

    if (diffHours < 24) {
      return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    }

    const diffDays = Math.floor(diffHours / 24);

    if (diffDays < 7) {
      return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
    }

    return date.toLocaleDateString();
  }
}
