import { Controller, Get } from '@nestjs/common';
import { WorkflowsService } from './workflows.service';
import { Workflows } from './types/workflows.types';

@Controller('workflows')
export class WorkflowsController {
  constructor(private readonly workflowsService: WorkflowsService) {}

  @Get()
  getWorkflows(): Workflows[] {
    return this.workflowsService.getWorkflows();
  }
}
