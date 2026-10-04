import { Injectable } from '@nestjs/common';

import type { DashboardData } from '../types/dashboard.types';
import { AgentsService } from '../../agents/agents.service';
import { DocumentsService } from '../../documents/documents.service';
import { ConversationsService } from '../../conversations/conversations.service';
import { WorkflowsService } from '../../workflows/workflows.service';
import { AnalyticsService } from '../../analytics/analytics.service';

@Injectable()
export class DashboardRepository {
  // constructor(private readonly agentsService: AgentsService) {}
  constructor(
    private readonly agentsService: AgentsService,
    private readonly documentsService: DocumentsService,
    private readonly conversationsService: ConversationsService,
    private readonly workflowsService: WorkflowsService,
    private readonly analyticsService: AnalyticsService,
  ) {}
  getKpis(): DashboardData['kpis'] {
    return [
      {
        id: 'agents',
        title: 'AI Agents',
        value: 24,
        subtitle: 'Active agents',
        icon: 'agents',
      },
      {
        id: 'documents',
        title: 'Documents',
        value: 1248,
        subtitle: 'Knowledge documents',
        icon: 'documents',
      },
      {
        id: 'chats',
        title: 'AI Chats',
        value: 386,
        subtitle: 'Conversations',
        icon: 'chats',
      },
      {
        id: 'workflows',
        title: 'Workflows',
        value: 16,
        subtitle: 'Active workflows',
        icon: 'workflows',
      },
    ];
  }

  getAiUsage(): DashboardData['aiUsage'] {
    return this.analyticsService.getAiUsage();
  }

  getAgents(): DashboardData['agents'] {
    return this.agentsService.getAgents();
  }

  getDocuments(): DashboardData['documents'] {
    return this.documentsService.getDocuments();
  }

  getConversations(): DashboardData['conversations'] {
    return this.conversationsService.getConversations();
  }

  getWorkflows(): DashboardData['workflows'] {
    return this.workflowsService.getWorkflows();
  }

  getAlerts(): DashboardData['alerts'] {
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

  getActivities(): DashboardData['activities'] {
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

  getDashboard(): DashboardData {
    return {
      kpis: this.getKpis(),
      aiUsage: this.getAiUsage(),
      agents: this.getAgents(),
      documents: this.getDocuments(),
      conversations: this.getConversations(),
      workflows: this.getWorkflows(),
      alerts: this.getAlerts(),
      activities: this.getActivities(),
    };
  }
}
