/**
 * ------------------------------------------------------------
 * @file: src\modules\agents\repositories\agents.repository.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 06-10-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AgentEntity } from '../entities/agent.entity';
import type { Agent } from '../types/agent.types';

@Injectable()
export class AgentsRepository {
  constructor(
    @InjectRepository(AgentEntity)
    private readonly repository: Repository<AgentEntity>,
  ) {}

  async findAll(): Promise<Agent[]> {
    const agents = await this.repository.find({
      order: {
        model: 'ASC',
      },
    });

    return agents.map((agent) => this.toDomain(agent));
  }

  async countActive(): Promise<number> {
    return this.repository.count({
      where: [{ status: 'Online' }, { status: 'Busy' }],
    });
  }

  private toDomain(agent: AgentEntity): Agent {
    return {
      model: agent.model,
      status: agent.status,
    };
  }
}
