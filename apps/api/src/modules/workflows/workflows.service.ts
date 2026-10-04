import { Injectable } from '@nestjs/common';
import { WorkflowsRepository } from './repositories/workflows.repository';
import { Workflows } from './types/workflows.types';

@Injectable()
export class WorkflowsService {
  constructor(private readonly workflowsRepositoru: WorkflowsRepository) {}
  getWorkflows(): Workflows[] {
    return this.workflowsRepositoru.getWrokflows();
  }
}
