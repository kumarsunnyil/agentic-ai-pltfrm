import { Injectable } from '@nestjs/common';

import type { DashboardData } from '../types/dashboard.types';
import { AgentsService } from '../../agents/agents.service';
import { DocumentsService } from '../../documents/documents.service';
import { ConversationsService } from '../../conversations/conversations.service';
import { WorkflowsService } from '../../workflows/workflows.service';
import { AnalyticsService } from '../../analytics/analytics.service';
import { AlertsService } from '../../alerts/alerts.service';
import { ActivitiesService } from '../../activities/activities.service';

@Injectable()
export class DashboardRepository {
  // constructor(private readonly agentsService: AgentsService) {}
  constructor(
    private readonly agentsService: AgentsService,
    private readonly documentsService: DocumentsService,
    private readonly conversationsService: ConversationsService,
    private readonly workflowsService: WorkflowsService,
    private readonly analyticsService: AnalyticsService,
    private readonly alertsService: AlertsService,
    private readonly activitiesService: ActivitiesService,
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
    return this.alertsService.getAlerts();
  }

  getActivities(): DashboardData['activities'] {
    return this.activitiesService.getActivities();
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
