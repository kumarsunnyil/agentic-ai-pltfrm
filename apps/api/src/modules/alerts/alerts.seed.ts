/**
 * ------------------------------------------------------------
 * @file: src\modules\alerts\alerts.seed.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 07-10-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AlertEntity } from './entities/alert.entity';

@Injectable()
export class AlertsSeed implements OnModuleInit {
  constructor(
    @InjectRepository(AlertEntity)
    private readonly repository: Repository<AlertEntity>,
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

    const alerts: AlertEntity[] = [
      {
        id: 'alert-001',
        severity: 'error',
        title: 'Agent unavailable',
        description: 'The Document Intelligence Agent is currently offline.',
        createdAt: new Date(now - 10 * 60 * 1000),
      },
      {
        id: 'alert-002',
        severity: 'warning',
        title: 'High token usage',
        description: 'AI token consumption is approaching the configured daily threshold.',
        createdAt: new Date(now - 35 * 60 * 1000),
      },
      {
        id: 'alert-003',
        severity: 'info',
        title: 'Knowledge index updated',
        description: 'The enterprise knowledge index was successfully updated.',
        createdAt: new Date(now - 2 * 60 * 60 * 1000),
      },
      {
        id: 'alert-004',
        severity: 'warning',
        title: 'Workflow queue growing',
        description: 'The document processing queue contains more items than usual.',
        createdAt: new Date(now - 5 * 60 * 60 * 1000),
      },
    ];

    await this.repository.save(alerts);

    console.log(`Seeded ${alerts.length} alerts.`);
  }
}
