import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import { firstValueFrom } from 'rxjs';
import config from 'src/config/config';

import { GetCampaignReportsRequestDto } from './dto/requests/get-campaign-reports.request.dto';
import { GetCampaignReportsResponseDto } from './dto/responses/get-campaign-reports.response.dto';

@Injectable()
export class CampaignSyncService {
  constructor(private readonly httpService: HttpService) {}

  private readonly apiUrl = config.get('campaign.api.url');
  private readonly apiKey = config.get('campaign.api.key');

  async getCampaignReports(
    params: GetCampaignReportsRequestDto,
  ): Promise<GetCampaignReportsResponseDto> {
    const url = `${this.apiUrl}/tasks/campaign/reports`;
    const config: AxiosRequestConfig = {
      headers: {
        'x-api-key': this.apiKey,
      },
      ...(params && { params }),
    };
    return (await firstValueFrom(this.httpService.get(url, config))).data;
  }
}
