/**
 * ------------------------------------------------------------
 * @file: src\modules\activities\activities.seed.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 07-10-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ActivityEntity } from './entities/activity.entity';

@Injectable()
export class ActivitiesSeed implements OnModuleInit {
  constructor(
    @InjectRepository(ActivityEntity)
    private readonly repository: Repository<ActivityEntity>,
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

    const activities: ActivityEntity[] = [
      {
        id: 'activity-001',
        title: 'Document indexed',
        description: 'Enterprise AI Architecture.pdf was successfully indexed.',
        type: 'document',
        createdAt: new Date(now - 10 * 60 * 1000),
      },
      {
        id: 'activity-002',
        title: 'Agent started',
        description: 'Enterprise RAG Agent started processing a knowledge request.',
        type: 'agent',
        createdAt: new Date(now - 25 * 60 * 1000),
      },
      {
        id: 'activity-003',
        title: 'Workflow completed',
        description: 'Document Classification workflow completed successfully.',
        type: 'workflow',
        createdAt: new Date(now - 60 * 60 * 1000),
      },
      {
        id: 'activity-004',
        title: 'Document processing',
        description: 'AI Governance Framework.pdf entered the processing pipeline.',
        type: 'document',
        createdAt: new Date(now - 2 * 60 * 60 * 1000),
      },
      {
        id: 'activity-005',
        title: 'Agent activity',
        description: 'Document Intelligence Agent processed a retrieval request.',
        type: 'agent',
        createdAt: new Date(now - 4 * 60 * 60 * 1000),
      },
    ];

    await this.repository.save(activities);

    console.log(`Seeded ${activities.length} activities.`);
  }
}
