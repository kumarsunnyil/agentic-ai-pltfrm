import { Injectable } from '@nestjs/common';

import type { Conversation } from '../types/conversation.types';

@Injectable()
export class ConversationsRepository {
  getConversations(): Conversation[] {
    return [
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
    ];
  }
}
