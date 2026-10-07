/**
 * ------------------------------------------------------------
 * @file: src\modules\alerts\repositories\alerts.repository.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 07-10-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AlertEntity } from '../entities/alert.entity';
import type { Alert } from '../types/alert.types';

@Injectable()
export class AlertsRepository {
  constructor(
    @InjectRepository(AlertEntity)
    private readonly repository: Repository<AlertEntity>,
  ) {}

  async findAll(): Promise<Alert[]> {
    const alerts = await this.repository.find({
      order: {
        createdAt: 'DESC',
      },
    });

    return alerts.map((alert) => this.toDomain(alert));
  }

  async count(): Promise<number> {
    return this.repository.count();
  }

  private toDomain(alert: AlertEntity): Alert {
    return {
      id: alert.id,
      severity: alert.severity,
      title: alert.title,
      description: alert.description,
      time: this.formatRelativeTime(alert.createdAt),
    };
  }

  private formatRelativeTime(date: Date): string {
    const diffMs = Date.now() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffMinutes < 1) {
      return 'Just now';
    }

    if (diffMinutes < 60) {
      return `${diffMinutes} min ago`;
    }

    const diffHours = Math.floor(diffMinutes / 60);

    if (diffHours < 24) {
      return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    }

    const diffDays = Math.floor(diffHours / 24);

    if (diffDays < 7) {
      return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
    }

    return date.toLocaleDateString();
  }
}
