/**
 * ------------------------------------------------------------
 * @file: src\modules\agents\agents.module.ts
 * @description: Reusable Enterprise Dashboard Agent Module.
 * @author: Sunil.S.Kumar
 * @date: 14-08-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

import { Module } from '@nestjs/common';

import { AgentsController } from './agents.controller';
import { AgentsService } from './agents.service';
import { AgentsRepository } from './repositories/agents.repository';

@Module({
  controllers: [AgentsController],
  providers: [AgentsService, AgentsRepository],
  exports: [AgentsService],
})
export class AgentsModule {}
