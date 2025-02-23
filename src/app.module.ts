import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CampaignSyncModule } from 'src/shared/modules/campaign-sync/campaign-sync.module';
import { CampaignReportScheduleModule } from 'src/modules/campaign-report-schedule/campaign-report-schedule.module';
import { CampaignReportModule } from 'src/modules/campaign-report/campaign-report.module';

@Module({
  imports: [
    DatabaseModule,
    CampaignReportModule,
    CampaignSyncModule,
    CampaignReportScheduleModule,
  ],
})
export class AppModule {}
