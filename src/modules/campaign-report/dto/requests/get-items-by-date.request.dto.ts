import { GetCampaignReportsRequestDto } from 'src/shared/modules/campaign-sync/dto/requests/get-campaign-reports.request.dto';

export type GetItemsByDateRequestDto = Pick<
  GetCampaignReportsRequestDto,
  'from_date' | 'to_date'
>;
