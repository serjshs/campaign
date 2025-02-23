import { IsDate, IsNumber, IsString, IsUUID } from 'class-validator';

export class CampaignReportDto {
  @IsString()
  campaign: string;

  @IsUUID()
  campaign_id: string;

  @IsString()
  adgroup: string;

  @IsUUID()
  adgroup_id: string;

  @IsString()
  ad: string;

  @IsUUID()
  ad_id: string;

  @IsUUID()
  client_id: string;

  @IsString()
  event_name: string;

  @IsDate()
  event_time: Date;
}
