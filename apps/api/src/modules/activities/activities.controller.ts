import { Controller, Get } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { Activity } from './types/activities.types';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Get()
  getActivities(): Activity[] {
    return this.activitiesService.getActivities();
  }
}
