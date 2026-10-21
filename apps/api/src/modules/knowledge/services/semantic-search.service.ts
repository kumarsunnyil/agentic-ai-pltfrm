import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { EmbeddingService } from './embedding.service';

const EMBEDDING_DIMENSIONS = 384;
const DEFAULT_SEARCH_LIMIT = 5;
const MAX_SEARCH_LIMIT = 20;

interface SemanticSearchRow {
  chunkId: string;
  documentId: string;
  documentTitle: string;
  chunkIndex: number | string;
  content: string;
  pageNumber: number | string | null;
  metadata: Record<string, unknown> | null;
  similarity: number | string;
}

export interface SemanticSearchResult {
  chunkId: string;
  documentId: string;
  documentTitle: string;
  chunkIndex: number;
  content: string;
  pageNumber: number | null;
  metadata: Record<string, unknown>;
  similarity: number;
}

export interface SemanticSearchResponse {
  query: string;
  count: number;
  results: SemanticSearchResult[];
}

@Injectable()
export class SemanticSearchService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly embeddingService: EmbeddingService,
  ) {}

  async search(query: string, limit = DEFAULT_SEARCH_LIMIT): Promise<SemanticSearchResponse> {
    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      throw new BadRequestException('A search query is required.');
    }

    if (!Number.isInteger(limit) || limit < 1 || limit > MAX_SEARCH_LIMIT) {
      throw new BadRequestException(`Search limit must be between 1 and ${MAX_SEARCH_LIMIT}.`);
    }

    const queryEmbedding = await this.embeddingService.embedQuery(normalizedQuery);

    if (
      queryEmbedding.length !== EMBEDDING_DIMENSIONS ||
      queryEmbedding.some((value) => !Number.isFinite(value))
    ) {
      throw new BadRequestException('The query embedding has an invalid dimension or value.');
    }

    // JSON.stringify produces the bracketed vector representation
    // accepted by PostgreSQL's pgvector input parser.
    const vectorLiteral = JSON.stringify(queryEmbedding);

    const rows: SemanticSearchRow[] = await this.dataSource.query(
      `
    SELECT
      dc.id AS "chunkId",
      dc."documentId" AS "documentId",
      d.title AS "documentTitle",
      dc."chunkIndex" AS "chunkIndex",
      dc.content AS "content",
      dc."pageNumber" AS "pageNumber",
      dc.metadata AS "metadata",
      1 - (dc.embedding <=> $1::vector) AS "similarity"
    FROM document_chunks dc
    INNER JOIN documents d
      ON d.id = dc."documentId"
    WHERE dc.embedding IS NOT NULL
      AND d.status = $2
    ORDER BY dc.embedding <=> $1::vector ASC
    LIMIT $3
  `,
      [vectorLiteral, 'Indexed', limit],
    );

    const results: SemanticSearchResult[] = rows.map((row) => ({
      chunkId: row.chunkId,
      documentId: row.documentId,
      documentTitle: row.documentTitle,
      chunkIndex: Number(row.chunkIndex),
      content: row.content,
      pageNumber: row.pageNumber === null ? null : Number(row.pageNumber),
      metadata: row.metadata ?? {},
      similarity: Number(row.similarity),
    }));

    return {
      query: normalizedQuery,
      count: results.length,
      results,
    };
  }
}
