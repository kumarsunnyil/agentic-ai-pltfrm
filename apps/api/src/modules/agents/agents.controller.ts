/**
 * ------------------------------------------------------------
 * @file: src\modules\agents\agents.controller.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 06-10-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

import { Controller, Get } from '@nestjs/common';

import { AgentsService } from './agents.service';
import type { Agent } from './types/agent.types';

@Controller('agents')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Get()
  async getAgents(): Promise<Agent[]> {
    return this.agentsService.getAgents();
  }
}
