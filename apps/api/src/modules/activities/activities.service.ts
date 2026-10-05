import { Injectable } from '@nestjs/common';
import { ActivitiesRepository } from './repositories/activities.repository';
import type { Activity } from './types/activities.types';

@Injectable()
export class ActivitiesService {
  constructor(private readonly activitiesRepository: ActivitiesRepository) {}
  getActivities(): Activity[] {
    return this.activitiesRepository.getActivities();
  }
}
