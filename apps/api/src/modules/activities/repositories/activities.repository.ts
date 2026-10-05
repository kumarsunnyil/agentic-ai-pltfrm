import { Injectable } from '@nestjs/common';
import { Activity } from '../types/activities.types';

@Injectable()
export class ActivitiesRepository {
  getActivities(): Activity[] {
    return [
      {
        id: 'activity-001',
        title: 'AI Agent completed execution',
        description: 'Document Classification Agent processed 128 documents.',
        time: '8 min ago',
        type: 'agent',
      },
      {
        id: 'activity-002',
        title: 'Knowledge document indexed',
        description: 'Enterprise AI Architecture was added to the knowledge base.',
        time: '21 min ago',
        type: 'document',
      },
      {
        id: 'activity-003',
        title: 'Workflow completed',
        description: 'Knowledge Indexing workflow completed successfully.',
        time: '38 min ago',
        type: 'workflow',
      },
    ];
  }
}
