import { Injectable } from '@nestjs/common';
import { CampaignReport } from 'src/database/entities/campaign-report.entity';
import { CampaignReportDao } from './campaign-report.dao';
import { GetItemsByDateRequestDto } from './dto/requests/get-items-by-date.request.dto';
import { GetAggregatedEventCountsRequestDto } from './dto/requests/get-aggregated-event-counts.request';
import { AggregatedEventCountDto } from './dto/aggregated-event-count.dto';
import { GetItemsRequestDto } from './dto/requests/get-items.request';

@Injectable()
export class CampaignReportService {
  constructor(private readonly campaignReportDao: CampaignReportDao) {}

  async findByDateRange(
    dateRangeDto: GetItemsByDateRequestDto,
  ): Promise<CampaignReport[]> {
    const { from_date, to_date } = dateRangeDto;

    return await this.campaignReportDao.findByDateRange({ from_date, to_date });
  }

  async findAggregatedEventCounts(
    request: GetItemsRequestDto,
  ): Promise<AggregatedEventCountDto[]> {
    return await this.campaignReportDao.findAggregatedEventCounts(request);
  }
}
