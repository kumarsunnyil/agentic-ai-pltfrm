/**
 * ------------------------------------------------------------
 * @file: src\modules\workflows\workflows.service.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 06-10-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

import { Injectable } from '@nestjs/common';

import { WorkflowsRepository } from './repositories/workflows.repository';
import type { Workflow } from './types/workflow.types';

@Injectable()
export class WorkflowsService {
  constructor(private readonly workflowsRepository: WorkflowsRepository) {}

  async getWorkflows(): Promise<Workflow[]> {
    return this.workflowsRepository.findAll();
  }

  async countWorkflows(): Promise<number> {
    return this.workflowsRepository.count();
  }
}
