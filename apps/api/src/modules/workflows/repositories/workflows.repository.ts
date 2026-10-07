/**
 * ------------------------------------------------------------
 * @file: src\modules\workflows\repositories\workflows.repository.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 06-10-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { WorkflowEntity } from '../entities/workflow.entity';
import type { Workflow } from '../types/workflow.types';

@Injectable()
export class WorkflowsRepository {
  constructor(
    @InjectRepository(WorkflowEntity)
    private readonly repository: Repository<WorkflowEntity>,
  ) {}

  async findAll(): Promise<Workflow[]> {
    const workflows = await this.repository.find({
      order: {
        createdAt: 'DESC',
      },
    });

    return workflows.map((workflow) => this.toDomain(workflow));
  }

  async count(): Promise<number> {
    return this.repository.count();
  }

  private toDomain(workflow: WorkflowEntity): Workflow {
    return {
      id: workflow.id,
      name: workflow.name,
      status: workflow.status,
      progress: workflow.progress,
    };
  }
}
