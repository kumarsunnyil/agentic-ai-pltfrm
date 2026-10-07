/**
 * ------------------------------------------------------------
 * @file: src\modules\activities\activities.service.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 07-10-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

import { Injectable } from '@nestjs/common';

import { ActivitiesRepository } from './repositories/activities.repository';
import type { Activity } from './types/activity.types';

@Injectable()
export class ActivitiesService {
  constructor(private readonly activitiesRepository: ActivitiesRepository) {}

  async getActivities(): Promise<Activity[]> {
    return this.activitiesRepository.findAll();
  }

  async countActivities(): Promise<number> {
    return this.activitiesRepository.count();
  }
}
