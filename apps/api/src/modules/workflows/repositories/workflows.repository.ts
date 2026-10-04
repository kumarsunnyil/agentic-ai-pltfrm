import { Injectable } from '@nestjs/common';
import type { Workflows } from '../types/workflows.types';

@Injectable()
export class WorkflowsRepository {
  getWrokflows(): Workflows[] {
    return [
      {
        id: 'wf-001',
        name: 'Document Ingestion',
        status: 'Running',
        progress: 72,
      },
      {
        id: 'wf-002',
        name: 'Knowledge Synchronization',
        status: 'Running',
        progress: 48,
      },
      {
        id: 'wf-003',
        name: 'Daily AI Evaluation',
        status: 'Queued',
        progress: 0,
      },
    ];
  }
}
