import { Controller, Get } from '@nestjs/common';

import { AgentsService } from './agents.service';
import type { Agent } from './types/agent.types';

@Controller('agents')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Get()
  getAgents(): Agent[] {
    return this.agentsService.getAgents();
  }
}
