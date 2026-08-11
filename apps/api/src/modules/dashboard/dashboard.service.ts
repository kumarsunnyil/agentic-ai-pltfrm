import { Injectable } from '@nestjs/common';

import type { DashboardData } from './types/dashboard.types';

@Injectable()
export class DashboardService {
  getDashboard(): DashboardData {
    return {
      kpis: [
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
      ],

      aiUsage: [
        { day: 'Mon', requests: 120, tokens: 1800 },
        { day: 'Tue', requests: 180, tokens: 2500 },
        { day: 'Wed', requests: 150, tokens: 2200 },
        { day: 'Thu', requests: 260, tokens: 3600 },
        { day: 'Fri', requests: 320, tokens: 4700 },
        { day: 'Sat', requests: 290, tokens: 4300 },
        { day: 'Sun', requests: 360, tokens: 5400 },
      ],

      agents: [
        {
          model: 'GPT-5',
          status: 'Online',
        },
        {
          model: 'Claude 4',
          status: 'Online',
        },
        {
          model: 'Gemini 2.5',
          status: 'Busy',
        },
        {
          model: 'DeepSeek',
          status: 'Offline',
        },
      ],

      documents: [
        {
          id: 'doc-001',
          title: 'Enterprise AI Architecture.pdf',
          type: 'PDF',
          time: '10 min ago',
          status: 'Indexed',
        },
        {
          id: 'doc-002',
          title: 'AI Governance Policy.docx',
          type: 'DOCX',
          time: '24 min ago',
          status: 'Indexed',
        },
        {
          id: 'doc-003',
          title: 'Agent Security Guidelines.pdf',
          type: 'PDF',
          time: '41 min ago',
          status: 'Processing',
        },
      ],

      conversations: [
        {
          id: 'chat-001',
          title: 'Enterprise RAG Architecture',
          preview: 'How should we structure the retrieval pipeline?',
          time: '8 min ago',
        },
        {
          id: 'chat-002',
          title: 'AI Governance Policy',
          preview: 'Summarize the key governance requirements.',
          time: '25 min ago',
        },
      ],

      workflows: [
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
      ],

      alerts: [
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
      ],

      activities: [
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
      ],
    };
  }
}
