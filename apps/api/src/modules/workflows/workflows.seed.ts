import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { WorkflowEntity } from './entities/workflow.entity';
import { WorkflowStatus } from './types/workflow.types';

@Injectable()
export class WorkflowsSeed implements OnModuleInit {
  constructor(
    @InjectRepository(WorkflowEntity)
    private readonly repository: Repository<WorkflowEntity>,
  ) {}

  async onModuleInit(): Promise<void> {
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    const count = await this.repository.count();

    if (count > 0) {
      return;
    }

    const now = Date.now();

    const workflows: WorkflowEntity[] = [
      {
        id: 'wf-001',
        name: 'Document Ingestion',
        status: WorkflowStatus.Running,
        progress: 72,
        createdAt: new Date(now),
      },
      {
        id: 'wf-002',
        name: 'Knowledge Synchronization',
        status: WorkflowStatus.Running,
        progress: 48,
        createdAt: new Date(now - 30 * 60 * 1000),
      },
      {
        id: 'wf-003',
        name: 'Daily AI Evaluation',
        status: WorkflowStatus.Queued,
        progress: 0,
        createdAt: new Date(now - 60 * 60 * 1000),
      },
    ];

    await this.repository.save(workflows);

    console.log(`Seeded ${workflows.length} workflows.`);
  }
}
