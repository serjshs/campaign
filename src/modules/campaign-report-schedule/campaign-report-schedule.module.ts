import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CampaignSyncModule } from 'src/shared/modules/campaign-sync/campaign-sync.module';
import { CampaignSyncService } from 'src/shared/modules/campaign-sync/campaign-sync.service';
import { CampaignReportMapper } from './campaign-report.mapper';
import { CampaignReportSchedulerService } from './campaign-report-schedule.service';
import { CampaignReportModule } from '../campaign-report/campaign-report.module';

@Module({
  imports: [CampaignSyncModule, CampaignReportModule, HttpModule],
  providers: [
    CampaignSyncService,
    CampaignReportMapper,
    CampaignReportSchedulerService,
  ],
  exports: [],
})
export class CampaignReportScheduleModule {}
