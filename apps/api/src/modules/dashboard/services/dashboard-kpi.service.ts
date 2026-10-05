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

  getKpis(): DashboardData['kpis'] {
    const agents = this.agentsService.getAgents();
    const documents = this.documentsService.getDocuments();
    const conversations = this.conversationsService.getConversations();
    const workflows = this.workflowsService.getWorkflows();

    return [
      {
        id: 'agents',
        title: 'AI Agents',
        value: agents.filter((agent) => agent.status !== 'Offline').length,
        subtitle: 'Active agents',
        icon: 'agents',
      },
      {
        id: 'documents',
        title: 'Documents',
        value: documents.length,
        subtitle: 'Knowledge documents',
        icon: 'documents',
      },
      {
        id: 'chats',
        title: 'AI Chats',
        value: conversations.length,
        subtitle: 'Conversations',
        icon: 'chats',
      },
      {
        id: 'workflows',
        title: 'Workflows',
        value: workflows.length,
        subtitle: 'Active workflows',
        icon: 'workflows',
      },
    ];
  }
}
