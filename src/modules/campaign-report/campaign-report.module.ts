import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignReport } from 'src/database/entities/campaign-report.entity';
import { CampaignReportController } from './campaign-report.controller';
import { CampaignReportDao } from './campaign-report.dao';
import { CampaignReportService } from './campaign-report.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CampaignReport]),
    ScheduleModule.forRoot(),
  ],
  providers: [CampaignReportService, CampaignReportDao],
  controllers: [CampaignReportController],
  exports: [CampaignReportService, CampaignReportDao],
})
export class CampaignReportModule {}
