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
import { TypeOrmModule } from '@nestjs/typeorm';

import { AgentsController } from './agents.controller';
import { AgentsRepository } from './repositories/agents.repository';
import { AgentsService } from './agents.service';
import { AgentEntity } from './entities/agent.entity';
import { AgentsSeed } from './agents.seed';

@Module({
  imports: [TypeOrmModule.forFeature([AgentEntity])],
  controllers: [AgentsController],
  providers: [AgentsService, AgentsRepository, AgentsSeed],
  exports: [AgentsService],
})
export class AgentsModule {}
