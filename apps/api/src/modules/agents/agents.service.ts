/**
 * ------------------------------------------------------------
 * @file: src\modules\agents\agents.service.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 06-10-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

import { Injectable } from '@nestjs/common';

import { AgentsRepository } from './repositories/agents.repository';
import type { Agent } from './types/agent.types';

@Injectable()
export class AgentsService {
  constructor(private readonly agentsRepository: AgentsRepository) {}

  async getAgents(): Promise<Agent[]> {
    return this.agentsRepository.findAll();
  }

  async countActiveAgents(): Promise<number> {
    return this.agentsRepository.countActive();
  }
}
