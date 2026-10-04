import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AgentsModule } from './modules/agents/agents.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { DocumentsModule } from './modules/documents/documents.module';

// import { DocumentsController } from './modules/documents/documents.controller';
// import { DocumentsRepository } from './modules/documents/repositories/documents.repository';
import { ConversationsModule } from './modules/conversations/conversations.module';
import { WorkflowsModule } from './modules/workflows/workflows.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { AlertsModule } from './modules/alerts/alerts.module';

@Module({
  imports: [
    DashboardModule,
    AgentsModule,
    DocumentsModule,
    ConversationsModule,
    WorkflowsModule,
    AnalyticsModule,
    AlertsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
