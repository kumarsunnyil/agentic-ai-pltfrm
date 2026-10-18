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
import { TextChunkingService } from './services/text-chunking.service';
import { TextExtractionService } from './services/text-extraction.service';
import { EmbeddingService } from './services/embedding.service';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentChunkEntity])],
  providers: [TextExtractionService, TextChunkingService, EmbeddingService],
  exports: [TextExtractionService, TextChunkingService, EmbeddingService, TypeOrmModule],
})
export class KnowledgeModule {}
