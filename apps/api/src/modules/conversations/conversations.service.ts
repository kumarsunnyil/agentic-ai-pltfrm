import { Injectable } from '@nestjs/common';

import { ConversationsRepository } from './repositories/conversations.repository';
import type { Conversation } from './types/conversation.types';

@Injectable()
export class ConversationsService {
  constructor(private readonly conversationsRepository: ConversationsRepository) {}

  getConversations(): Conversation[] {
    return this.conversationsRepository.getConversations();
  }
}
