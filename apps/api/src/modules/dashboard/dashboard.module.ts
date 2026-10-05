import { Module } from '@nestjs/common';

import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { AgentsModule } from '../agents/agents.module';
import { DocumentsModule } from '../documents/documents.module';
import { ConversationsModule } from '../conversations/conversations.module';
import { WorkflowsModule } from '../workflows/workflows.module';
import { AnalyticsModule } from '../analytics/analytics.module';
import { AlertsModule } from '../alerts/alerts.module';
import { ActivitiesModule } from '../activities/activities.module';
import { DashboardKpiService } from './services/dashboard-kpi.service';

@Module({
  imports: [
    AgentsModule,
    DocumentsModule,
    ConversationsModule,
    WorkflowsModule,
    AnalyticsModule,
    AlertsModule,
    ActivitiesModule,
  ],
  controllers: [DashboardController],
  providers: [DashboardService, DashboardKpiService],
  exports: [DashboardService],
})
export class DashboardModule {}
