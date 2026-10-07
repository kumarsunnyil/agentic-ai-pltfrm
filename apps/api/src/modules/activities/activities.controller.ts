/**
 * ------------------------------------------------------------
 * @file: src\modules\activities\activities.controller.ts
 * @description: Reusable Enterprise Dashboard Container.
 * @author: Sunil.S.Kumar
 * @date: 07-10-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */

import { Controller, Get } from '@nestjs/common';

import { ActivitiesService } from './activities.service';
import type { Activity } from './types/activity.types';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Get()
  async getActivities(): Promise<Activity[]> {
    return this.activitiesService.getActivities();
  }
}
