import { Module } from '@nestjs/common';
import { WorkflowsService } from './workflows.service';
import { WorkflowsRepository } from './repositories/workflows.repository';
import { WorkflowsController } from './workflows.controller';

@Module({
  controllers: [WorkflowsController],
  providers: [WorkflowsService, WorkflowsRepository],
  exports: [WorkflowsService],
})
export class WorkflowsModule {}
