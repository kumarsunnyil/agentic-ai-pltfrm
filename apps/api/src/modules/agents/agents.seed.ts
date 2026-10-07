/**
 * ------------------------------------------------------------
 * @file: src\modules\agents\agents.seed.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 06-10-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AgentEntity } from './entities/agent.entity';

@Injectable()
export class AgentsSeed implements OnModuleInit {
  constructor(
    @InjectRepository(AgentEntity)
    private readonly repository: Repository<AgentEntity>,
  ) {}

  async onModuleInit(): Promise<void> {
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    const count = await this.repository.count();

    if (count > 0) {
      return;
    }

    const agents: AgentEntity[] = [
      {
        model: 'GPT-5.6',
        status: 'Online',
      },
      {
        model: 'Claude Sonnet',
        status: 'Online',
      },
      {
        model: 'Gemini Pro',
        status: 'Busy',
      },
      {
        model: 'Enterprise RAG Agent',
        status: 'Online',
      },
      {
        model: 'Document Intelligence Agent',
        status: 'Offline',
      },
    ];

    await this.repository.save(agents);

    console.log(`Seeded ${agents.length} agents.`);
  }
}
