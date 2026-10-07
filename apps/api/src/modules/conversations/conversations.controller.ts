import { Controller, Get } from '@nestjs/common';

import { ConversationsService } from './conversations.service';
import type { Conversation } from './types/conversation.types';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Get()
  async getConversations(): Promise<Conversation[]> {
    return this.conversationsService.getConversations();
  }
}
