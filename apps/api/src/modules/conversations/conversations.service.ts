import { Injectable } from '@nestjs/common';

import { ConversationsRepository } from './repositories/conversations.repository';
import type { Conversation } from './types/conversation.types';

@Injectable()
export class ConversationsService {
  constructor(private readonly conversationsRepository: ConversationsRepository) {}

  async getConversations(): Promise<Conversation[]> {
    return this.conversationsRepository.findAll();
  }

  async countConversations(): Promise<number> {
    return this.conversationsRepository.count();
  }
}
