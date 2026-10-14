/**
 * ------------------------------------------------------------
 * @file: src\modules\documents\types\document.types.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 14-10-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

export type DocumentStatus = 'Uploaded' | 'Processing' | 'Indexed' | 'Failed';

export interface Document {
  id: string;
  title: string;
  type: string;
  time: string;
  status: DocumentStatus;
  originalName?: string | null;
  mimeType?: string | null;
  sizeBytes?: number | null;
}
