/**
 * ------------------------------------------------------------
 * @file: src\modules\activities\repositories\activities.repository.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 07-10-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ActivityEntity } from '../entities/activity.entity';
import type { Activity } from '../types/activity.types';

@Injectable()
export class ActivitiesRepository {
  constructor(
    @InjectRepository(ActivityEntity)
    private readonly repository: Repository<ActivityEntity>,
  ) {}

  async findAll(): Promise<Activity[]> {
    const activities = await this.repository.find({
      order: {
        createdAt: 'DESC',
      },
    });

    return activities.map((activity) => this.toDomain(activity));
  }

  async count(): Promise<number> {
    return this.repository.count();
  }

  private toDomain(activity: ActivityEntity): Activity {
    return {
      id: activity.id,
      title: activity.title,
      description: activity.description,
      time: this.formatRelativeTime(activity.createdAt),
      type: activity.type,
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
