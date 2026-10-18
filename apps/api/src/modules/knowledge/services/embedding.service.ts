import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { pipeline } from '@huggingface/transformers';
import type { FeatureExtractionPipeline } from '@huggingface/transformers';

const MODEL_ID = 'Xenova/bge-small-en-v1.5';
const EMBEDDING_DIMENSIONS = 384;
const BATCH_SIZE = 16;

const QUERY_PREFIX = 'Represent this sentence for searching relevant passages: ';

@Injectable()
export class EmbeddingService {
  private extractorPromise: Promise<FeatureExtractionPipeline> | null = null;

  /**
   * Generate embeddings for document chunks.
   * Document text is embedded without a query prefix.
   */
  async embedDocuments(texts: string[]): Promise<number[][]> {
    if (texts.length === 0) {
      return [];
    }

    const normalizedTexts = texts.map((text) => text.trim());

    if (normalizedTexts.some((text) => text.length === 0)) {
      throw new BadRequestException('Document chunks must not contain empty text.');
    }

    return this.embedBatch(normalizedTexts);
  }

  /**
   * Generate an embedding for a user's search query.
   * BGE recommends this instruction for retrieval queries.
   */
  async embedQuery(query: string): Promise<number[]> {
    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      throw new BadRequestException('Search query must not be empty.');
    }

    const [embedding] = await this.embedBatch([`${QUERY_PREFIX}${normalizedQuery}`]);

    if (!embedding) {
      throw new InternalServerErrorException('Failed to generate a query embedding.');
    }

    return embedding;
  }

  private async embedBatch(texts: string[]): Promise<number[][]> {
    const extractor = await this.getExtractor();
    const embeddings: number[][] = [];

    for (let start = 0; start < texts.length; start += BATCH_SIZE) {
      const batch = texts.slice(start, start + BATCH_SIZE);

      const output = await extractor(batch, {
        pooling: 'mean',
        normalize: true,
      });

      const [batchCount, dimensions] = output.dims;

      if (batchCount !== batch.length || dimensions !== EMBEDDING_DIMENSIONS) {
        throw new InternalServerErrorException(
          `Unexpected embedding shape: ${output.dims.join(' x ')}.`,
        );
      }

      const values = Array.from(output.data);

      for (let index = 0; index < batch.length; index++) {
        const offset = index * EMBEDDING_DIMENSIONS;
        const vector = values.slice(offset, offset + EMBEDDING_DIMENSIONS);

        if (
          vector.length !== EMBEDDING_DIMENSIONS ||
          vector.some((value) => !Number.isFinite(value))
        ) {
          throw new InternalServerErrorException('The embedding model returned an invalid vector.');
        }

        embeddings.push(vector);
      }
    }

    return embeddings;
  }

  private getExtractor(): Promise<FeatureExtractionPipeline> {
    if (!this.extractorPromise) {
      this.extractorPromise = this.createExtractor();
    }

    return this.extractorPromise;
  }

  private async createExtractor(): Promise<FeatureExtractionPipeline> {
    try {
      return await pipeline('feature-extraction', MODEL_ID);
    } catch (error: unknown) {
      // Allow a later request to retry model initialization.
      this.extractorPromise = null;
      throw error;
    }
  }
}
