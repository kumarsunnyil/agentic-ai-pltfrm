/**
 * ------------------------------------------------------------
 * @file: src\modules\workflows\workflows.controller.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 06-10-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

import { Controller, Get } from '@nestjs/common';

import { WorkflowsService } from './workflows.service';
import type { Workflow } from './types/workflow.types';

@Controller('workflows')
export class WorkflowsController {
  constructor(private readonly workflowsService: WorkflowsService) {}

  @Get()
  async getWorkflows(): Promise<Workflow[]> {
    return this.workflowsService.getWorkflows();
  }
}
