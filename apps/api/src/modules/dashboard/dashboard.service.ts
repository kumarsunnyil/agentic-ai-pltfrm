import { Injectable } from '@nestjs/common';

import { ActivitiesService } from '../activities/activities.service';
import { AgentsService } from '../agents/agents.service';
import { AnalyticsService } from '../analytics/analytics.service';
import { AlertsService } from '../alerts/alerts.service';
import { ConversationsService } from '../conversations/conversations.service';
import { DocumentsService } from '../documents/documents.service';
import { WorkflowsService } from '../workflows/workflows.service';
import { DashboardKpiService } from './services/dashboard-kpi.service';
import type { DashboardData } from './types/dashboard.types';

@Injectable()
export class DashboardService {
  constructor(
    private readonly dashboardKpiService: DashboardKpiService,
    private readonly analyticsService: AnalyticsService,
    private readonly agentsService: AgentsService,
    private readonly documentsService: DocumentsService,
    private readonly conversationsService: ConversationsService,
    private readonly workflowsService: WorkflowsService,
    private readonly alertsService: AlertsService,
    private readonly activitiesService: ActivitiesService,
  ) {}

  async getDashboard(): Promise<DashboardData> {
    const [kpis, aiUsage, agents, documents, conversations, workflows, alerts, activities] =
      await Promise.all([
        this.dashboardKpiService.getKpis(),
        Promise.resolve(this.analyticsService.getAiUsage()),
        Promise.resolve(this.agentsService.getAgents()),
        this.documentsService.getDocuments(),
        Promise.resolve(this.conversationsService.getConversations()),
        Promise.resolve(this.workflowsService.getWorkflows()),
        Promise.resolve(this.alertsService.getAlerts()),
        Promise.resolve(this.activitiesService.getActivities()),
      ]);

    return {
      kpis,
      aiUsage,
      agents,
      documents,
      conversations,
      workflows,
      alerts,
      activities,
    };
  }
}
