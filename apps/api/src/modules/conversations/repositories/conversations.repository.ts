import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ConversationEntity } from '../entities/conversation.entity';
import type { Conversation } from '../types/conversation.types';

@Injectable()
export class ConversationsRepository {
  constructor(
    @InjectRepository(ConversationEntity)
    private readonly repository: Repository<ConversationEntity>,
  ) {}

  async findAll(): Promise<Conversation[]> {
    const conversations = await this.repository.find({
      order: {
        createdAt: 'DESC',
      },
    });

    return conversations.map((conversation) => this.toDomain(conversation));
  }

  async count(): Promise<number> {
    return this.repository.count();
  }

  private toDomain(conversation: ConversationEntity): Conversation {
    return {
      id: conversation.id,
      title: conversation.title,
      preview: conversation.preview,
      time: this.formatRelativeTime(conversation.createdAt),
    };
  }

  private formatRelativeTime(date: Date): string {
    const diffMs = Date.now() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffMinutes < 1) {
      return 'Just now';
    }

    if (diffMinutes < 60) {
      return `${diffMinutes} min ago`;
    }

    const diffHours = Math.floor(diffMinutes / 60);

    if (diffHours < 24) {
      return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    }

    const diffDays = Math.floor(diffHours / 24);

    if (diffDays < 7) {
      return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
    }

    return date.toLocaleDateString();
  }
}
