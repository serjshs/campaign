import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { CampaignReportService } from './campaign-report.service';
import { CampaignReportDto } from './dto/campaign-report.dto';
import { GetItemsByDateRequestDto } from './dto/requests/get-items-by-date.request.dto';
import { GetAggregatedEventCountsRequestDto } from './dto/requests/get-aggregated-event-counts.request';
import { AggregatedEventCountDto } from './dto/aggregated-event-count.dto';
import { GetItemsRequestDto } from './dto/requests/get-items.request';

@ApiTags('Campaign Reports')
@Controller('campaign-report')
export class CampaignReportController {
  constructor(private readonly campaignReportService: CampaignReportService) {}

  @Get('/find-by-date-range')
  @ApiOperation({
    summary: 'Find campaign reports by date range',
    description: 'Returns campaign reports within a given date range',
  })
  @ApiResponse({
    status: 200,
    description: 'List of campaign reports within the given date range',
    type: [CampaignReportDto],
  })
  @ApiQuery({
    name: 'from_date',
    type: String,
    required: true,
    description: 'Start date in ISO format',
  })
  @ApiQuery({
    name: 'to_date',
    type: String,
    required: true,
    description: 'End date in ISO format',
  })
  async getItemsByDateRange(
    @Query()
    request: GetItemsByDateRequestDto,
  ): Promise<CampaignReportDto[]> {
    return await this.campaignReportService.findByDateRange(request);
  }

  @Get('/find-events-counts')
  @ApiOperation({
    summary: 'Find events counts',
    description: 'Returns aggregated event counts for a given event name',
  })
  async findEventsCounts(
    @Query()
    request: GetItemsRequestDto,
  ): Promise<AggregatedEventCountDto[]> {
    return await this.campaignReportService.findAggregatedEventCounts(request);
  }
}
