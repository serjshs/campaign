import { Module } from '@nestjs/common';
import { CampaignSyncService } from './campaign-sync.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [CampaignSyncService],
  exports: [CampaignSyncService],
})
export class CampaignSyncModule {}
