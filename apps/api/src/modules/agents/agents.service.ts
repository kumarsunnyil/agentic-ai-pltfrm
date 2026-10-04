import { Injectable } from '@nestjs/common';

import { AgentsRepository } from './repositories/agents.repository';
import type { Agent } from './types/agent.types';

@Injectable()
export class AgentsService {
  constructor(private readonly agentsRepository: AgentsRepository) {}

  getAgents(): Agent[] {
    return this.agentsRepository.getAgents();
  }
}
