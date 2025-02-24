import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CampaignSyncService } from './campaign-sync.service';

@Module({
  imports: [HttpModule],
  providers: [CampaignSyncService],
  exports: [CampaignSyncService],
})
export class CampaignSyncModule {}
