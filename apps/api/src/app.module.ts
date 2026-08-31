import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { AgentsModule } from './modules/agents/agents.module';

@Module({
  imports: [DashboardModule, AgentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
