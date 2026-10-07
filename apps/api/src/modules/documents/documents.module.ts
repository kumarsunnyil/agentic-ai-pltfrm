/**
 * ------------------------------------------------------------
 * @file: src\modules\documents\documents.module.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 06-10-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DocumentsController } from './documents.controller';
import { DocumentsSeed } from './documents.seed';

import { DocumentsRepository } from './repositories/documents.repository';
import { DocumentsService } from './documents.service';
import { DocumentEntity } from './entities/document.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentEntity])],
  controllers: [DocumentsController],
  providers: [DocumentsService, DocumentsRepository, DocumentsSeed],
  exports: [DocumentsService],
})
export class DocumentsModule {}
