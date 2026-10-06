import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AgentsModule } from './modules/agents/agents.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { DocumentsModule } from './modules/documents/documents.module';

import { ConversationsModule } from './modules/conversations/conversations.module';
import { WorkflowsModule } from './modules/workflows/workflows.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { AlertsModule } from './modules/alerts/alerts.module';
import { AlertsService } from './no-spec/modules/alerts/alerts.service';
import { ActivitiesModule } from './modules/activities/activities.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    DashboardModule,
    AgentsModule,
    DocumentsModule,
    ConversationsModule,
    WorkflowsModule,
    AnalyticsModule,
    AlertsModule,
    ActivitiesModule,
  ],
  controllers: [AppController],
  providers: [AppService, AlertsService],
})
export class AppModule {}
