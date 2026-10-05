import { Injectable } from '@nestjs/common';
import { Alert } from '../types/alert.types';

@Injectable()
export class AlertsRepository {
  getAlerts(): Alert[] {
    return [
      {
        id: 'alert-001',
        severity: 'warning',
        title: 'High token usage detected',
        description: 'AI Workspace usage increased by 28% in the last hour.',
        time: '12 min ago',
      },
      {
        id: 'alert-002',
        severity: 'info',
        title: 'Knowledge index updated',
        description: 'The enterprise knowledge index completed successfully.',
        time: '32 min ago',
      },
      {
        id: 'alert-003',
        severity: 'error',
        title: 'Agent execution failed',
        description: 'Document Classification Agent failed during execution.',
        time: '48 min ago',
      },
    ];
  }
}
