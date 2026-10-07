import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ConversationEntity } from './entities/conversation.entity';

@Injectable()
export class ConversationsSeed implements OnModuleInit {
  constructor(
    @InjectRepository(ConversationEntity)
    private readonly repository: Repository<ConversationEntity>,
  ) {}

  async onModuleInit(): Promise<void> {
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    const count = await this.repository.count();

    if (count > 0) {
      return;
    }

    const now = Date.now();

    const conversations: ConversationEntity[] = [
      {
        id: 'conv-001',
        title: 'Enterprise AI Architecture',
        preview: 'Explain the recommended architecture for an enterprise Agentic RAG platform.',
        createdAt: new Date(now - 15 * 60 * 1000),
      },
      {
        id: 'conv-002',
        title: 'Document Intelligence',
        preview: 'How can documents be securely indexed and retrieved using semantic search?',
        createdAt: new Date(now - 45 * 60 * 1000),
      },
      {
        id: 'conv-003',
        title: 'Agent Orchestration',
        preview: 'Design a multi-agent workflow for enterprise knowledge discovery.',
        createdAt: new Date(now - 2 * 60 * 60 * 1000),
      },
      {
        id: 'conv-004',
        title: 'RAG Evaluation Strategy',
        preview: 'What metrics should be used to evaluate the quality of a RAG pipeline?',
        createdAt: new Date(now - 4 * 60 * 60 * 1000),
      },
      {
        id: 'conv-005',
        title: 'AI Security Controls',
        preview: 'Discuss authentication, authorization, data isolation, and prompt security.',
        createdAt: new Date(now - 24 * 60 * 60 * 1000),
      },
    ];

    await this.repository.save(conversations);

    console.log(`Seeded ${conversations.length} conversations.`);
  }
}
