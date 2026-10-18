import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { DocumentChunkEntity } from '../entities/document-chunk.entity';
import type { DocumentTextChunk } from './text-chunking.service';

const EMBEDDING_DIMENSIONS = 384;
const EMBEDDING_MODEL = 'Xenova/bge-small-en-v1.5';
const INSERT_BATCH_SIZE = 100;

@Injectable()
export class DocumentChunkPersistenceService {
  constructor(private readonly dataSource: DataSource) {}

  async replaceDocumentChunks(
    documentId: string,
    chunks: DocumentTextChunk[],
    embeddings: number[][],
  ): Promise<number> {
    if (!documentId.trim()) {
      throw new BadRequestException('A document ID is required.');
    }

    if (chunks.length === 0) {
      throw new BadRequestException('Cannot persist an empty list of document chunks.');
    }

    if (chunks.length !== embeddings.length) {
      throw new BadRequestException('The number of chunks must match the number of embeddings.');
    }

    this.validateChunksAndEmbeddings(chunks, embeddings);

    await this.dataSource.transaction(async (manager) => {
      const repository = manager.getRepository(DocumentChunkEntity);

      // Remove prior chunks and insert replacements atomically.
      await repository.delete({ documentId });

      for (let start = 0; start < chunks.length; start += INSERT_BATCH_SIZE) {
        const batchEnd = Math.min(start + INSERT_BATCH_SIZE, chunks.length);

        const entities: DocumentChunkEntity[] = [];

        for (let index = start; index < batchEnd; index++) {
          const chunk = chunks[index];
          const embedding = embeddings[index];

          entities.push(
            repository.create({
              documentId,
              chunkIndex: chunk.chunkIndex,
              content: chunk.content,
              pageNumber: chunk.pageNumber,
              metadata: chunk.metadata,
              embedding,
              embeddingModel: EMBEDDING_MODEL,
            }),
          );
        }

        await repository.save(entities);
      }
    });

    return chunks.length;
  }

  private validateChunksAndEmbeddings(chunks: DocumentTextChunk[], embeddings: number[][]): void {
    const chunkIndexes = new Set<number>();

    for (let index = 0; index < chunks.length; index++) {
      const chunk = chunks[index];
      const embedding = embeddings[index];

      if (!Number.isInteger(chunk.chunkIndex) || chunk.chunkIndex < 0) {
        throw new BadRequestException(`Invalid chunk index at position ${index}.`);
      }

      if (chunkIndexes.has(chunk.chunkIndex)) {
        throw new BadRequestException(`Duplicate chunk index: ${chunk.chunkIndex}.`);
      }

      chunkIndexes.add(chunk.chunkIndex);

      if (!chunk.content.trim()) {
        throw new BadRequestException(`Chunk ${chunk.chunkIndex} has empty content.`);
      }

      if (
        embedding.length !== EMBEDDING_DIMENSIONS ||
        embedding.some((value) => !Number.isFinite(value))
      ) {
        throw new BadRequestException(
          `Chunk ${chunk.chunkIndex} has an invalid embedding. Expected ${EMBEDDING_DIMENSIONS} finite numbers.`,
        );
      }
    }
  }
}
