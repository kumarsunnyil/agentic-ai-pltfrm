import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { basename, join, resolve } from 'node:path';

import { DocumentEntity } from '../../documents/entities/document.entity';
import { DocumentChunkPersistenceService } from './document-chunk-persistence.service';
import { EmbeddingService } from './embedding.service';
import { TextChunkingService } from './text-chunking.service';
import { TextExtractionService } from './text-extraction.service';

@Injectable()
export class DocumentIngestionService {
  private readonly logger = new Logger(DocumentIngestionService.name);

  constructor(
    private readonly dataSource: DataSource,
    private readonly textExtractionService: TextExtractionService,
    private readonly textChunkingService: TextChunkingService,
    private readonly embeddingService: EmbeddingService,
    private readonly chunkPersistenceService: DocumentChunkPersistenceService,
  ) {}

  async processDocument(documentId: string): Promise<void> {
    const documentsRepository = this.dataSource.getRepository(DocumentEntity);

    const document = await documentsRepository.findOneBy({
      id: documentId,
    });

    if (!document) {
      throw new NotFoundException(`Document ${documentId} was not found.`);
    }

    try {
      await documentsRepository.update(documentId, {
        status: 'Processing',
      });

      const storageDirectory = resolve(
        process.env.DOCUMENT_STORAGE_DIR || join(process.cwd(), 'storage', 'documents'),
      );

      // Use only the stored filename, not a caller-provided path.
      const filePath = resolve(storageDirectory, basename(document.storageKey));

      if (
        !filePath.startsWith(`${storageDirectory}\\`) &&
        !filePath.startsWith(`${storageDirectory}/`)
      ) {
        throw new Error('Invalid document storage path.');
      }

      const segments = await this.textExtractionService.extractFromFile(filePath);

      const chunks = this.textChunkingService.chunkSegments(segments);

      if (chunks.length === 0) {
        throw new Error('No text chunks were produced.');
      }

      const embeddings = await this.embeddingService.embedDocuments(
        chunks.map((chunk) => chunk.content),
      );

      await this.chunkPersistenceService.replaceDocumentChunks(document.id, chunks, embeddings);

      await documentsRepository.update(documentId, {
        status: 'Indexed',
      });

      this.logger.log(`Document ${documentId} indexed successfully: ${chunks.length} chunks.`);
    } catch (error: unknown) {
      await documentsRepository.update(documentId, {
        status: 'Failed',
      });

      const message = error instanceof Error ? error.message : String(error);

      this.logger.error(`Document ingestion failed for ${documentId}: ${message}`);

      throw error;
    }
  }
}
