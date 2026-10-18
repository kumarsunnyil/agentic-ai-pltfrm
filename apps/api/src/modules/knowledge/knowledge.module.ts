/**
 * ------------------------------------------------------------
 * @file: src\modules\knowledge\knowledge.module.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 18-10-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DocumentChunkEntity } from './entities/document-chunk.entity';
import { DocumentChunkPersistenceService } from './services/document-chunk-persistence.service';
import { EmbeddingService } from './services/embedding.service';
import { TextChunkingService } from './services/text-chunking.service';
import { TextExtractionService } from './services/text-extraction.service';
import { DocumentIngestionService } from './services/document-ingestion.service';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentChunkEntity])],
  providers: [
    TextExtractionService,
    TextChunkingService,
    EmbeddingService,
    DocumentChunkPersistenceService,
    DocumentIngestionService,
  ],
  exports: [
    TextExtractionService,
    TextChunkingService,
    EmbeddingService,
    DocumentChunkPersistenceService,
    DocumentIngestionService,
    TypeOrmModule,
  ],
})
export class KnowledgeModule {}
