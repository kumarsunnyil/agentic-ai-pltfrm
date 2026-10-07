/**
 * ------------------------------------------------------------
 * @file: src\modules\workflows\workflows.module.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 06-10-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkflowsController } from './workflows.controller';
import { WorkflowsSeed } from './workflows.seed';
import { WorkflowEntity } from './entities/workflow.entity';
import { WorkflowsRepository } from './repositories/workflows.repository';
import { WorkflowsService } from './workflows.service';

@Module({
  imports: [TypeOrmModule.forFeature([WorkflowEntity])],
  controllers: [WorkflowsController],
  providers: [WorkflowsService, WorkflowsRepository, WorkflowsSeed],
  exports: [WorkflowsService],
})
export class WorkflowsModule {}
