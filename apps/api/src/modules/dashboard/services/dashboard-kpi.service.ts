/**
 * ------------------------------------------------------------
 * @file: src\modules\dashboard\services\dashboard-kpi.service.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 06-10-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

import { Injectable } from '@nestjs/common';

import { AgentsService } from '../../agents/agents.service';
import { ConversationsService } from '../../conversations/conversations.service';
import { DocumentsService } from '../../documents/documents.service';
import { WorkflowsService } from '../../workflows/workflows.service';
import type { DashboardData } from '../types/dashboard.types';

@Injectable()
export class DashboardKpiService {
  constructor(
    private readonly agentsService: AgentsService,
    private readonly documentsService: DocumentsService,
    private readonly conversationsService: ConversationsService,
    private readonly workflowsService: WorkflowsService,
  ) {}

  async getKpis(): Promise<DashboardData['kpis']> {
    const [documentCount, conversationCount, activeAgentCount, workflowCount] = await Promise.all([
      this.documentsService.countDocuments(),
      this.conversationsService.countConversations(),
      this.agentsService.countActiveAgents(),
      this.workflowsService.countWorkflows(),
    ]);

    return [
      {
        id: 'agents',
        title: 'AI Agents',
        value: activeAgentCount,
        subtitle: 'Active agents',
        icon: 'agents',
      },
      {
        id: 'documents',
        title: 'Documents',
        value: documentCount,
        subtitle: 'Knowledge documents',
        icon: 'documents',
      },
      {
        id: 'chats',
        title: 'AI Chats',
        value: conversationCount,
        subtitle: 'Conversations',
        icon: 'chats',
      },
      {
        id: 'workflows',
        title: 'Workflows',
        value: workflowCount,
        subtitle: 'Active workflows',
        icon: 'workflows',
      },
    ];
  }
}
