import { Injectable } from '@nestjs/common';

import type { ExtractedTextSegment } from '../types/extracted-text-segment.type';

export interface DocumentTextChunk {
  chunkIndex: number;
  content: string;
  pageNumber: number | null;
  metadata: Record<string, unknown>;
}

@Injectable()
export class TextChunkingService {
  private readonly chunkSize = 1200;
  private readonly chunkOverlap = 200;
  private readonly minBoundarySearch = 0.65;

  chunkSegments(segments: ExtractedTextSegment[]): DocumentTextChunk[] {
    const chunks: DocumentTextChunk[] = [];

    for (const segment of segments) {
      const text = segment.text.trim();

      if (!text) {
        continue;
      }

      let start = 0;

      while (start < text.length) {
        const hardEnd = Math.min(start + this.chunkSize, text.length);

        const end = hardEnd === text.length ? hardEnd : this.findBoundary(text, start, hardEnd);

        const content = text.slice(start, end).trim();

        if (content) {
          chunks.push({
            chunkIndex: chunks.length,
            content,
            pageNumber: segment.pageNumber,
            metadata: {
              sourcePage: segment.pageNumber,
              characterStart: start,
              characterEnd: end,
            },
          });
        }

        if (end >= text.length) {
          break;
        }

        // Ensure progress even if a boundary produces a short chunk.
        start = Math.max(start + 1, end - this.chunkOverlap);
      }
    }

    return chunks;
  }

  private findBoundary(text: string, start: number, hardEnd: number): number {
    const minimumEnd = start + Math.floor((hardEnd - start) * this.minBoundarySearch);

    const separators = ['\n\n', '\n', '. ', '? ', '! ', '; ', ', ', ' '];

    for (const separator of separators) {
      const boundary = text.lastIndexOf(separator, hardEnd - 1);

      if (boundary >= minimumEnd) {
        return boundary + separator.length;
      }
    }

    return hardEnd;
  }
}
