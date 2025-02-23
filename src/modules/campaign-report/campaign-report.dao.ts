import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { from, lastValueFrom, mergeMap, Observable, range, reduce } from 'rxjs';
import { CampaignReport } from 'src/database/entities/campaign-report.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { CampaignReportDto } from './dto/campaign-report.dto';
import { AggregatedEventCountDto } from './dto/aggregated-event-count.dto';
import { GetItemsByDateRequestDto } from './dto/requests/get-items-by-date.request.dto';
import { GetAggregatedEventCountsRequestDto } from './dto/requests/get-aggregated-event-counts.request';
import { GetItemsRequestDto } from './dto/requests/get-items.request';

@Injectable()
export class CampaignReportDao {
  private readonly logger = new Logger(CampaignReportDao.name);

  constructor(
    @InjectRepository(CampaignReport)
    private readonly campaignReportRepository: Repository<CampaignReport>,
  ) {}

  async saveReports(reports: CampaignReportDto[]): Promise<void> {
    if (!reports.length) {
      this.logger.warn('No reports to save.');
      return;
    }

    try {
      await this.campaignReportRepository
        .createQueryBuilder()
        .insert()
        .into(CampaignReport)
        .values(reports)
        .orIgnore()
        .execute();
    } catch (error) {
      this.logger.error('Error saving reports:', error);
    }
  }

  private getReportsByDateRange(
    paginationOptions: PaginationDto,
    dateRange: { fromDate: Date; toDate: Date },
  ): Observable<CampaignReport[]> {
    const { page, take = 100 } = paginationOptions;
    const { fromDate, toDate } = dateRange;
    const skip = ((page ?? 1) - 1) * take;
    return from(
      this.campaignReportRepository
        .createQueryBuilder('campaignReport')
        .where('campaignReport.event_time BETWEEN :fromDate AND :toDate', {
          fromDate,
          toDate,
        })
        .orderBy('campaignReport.event_time', 'ASC')
        .skip(skip)
        .take(take)
        .getMany(),
    );
  }

  async findByDateRange(
    request: GetItemsByDateRequestDto,
  ): Promise<CampaignReport[]> {
    const { from_date, to_date } = request;

    const fromDate = new Date(from_date);
    const toDate = new Date(to_date);

    const take = 1000;

    return lastValueFrom(
      from(
        this.campaignReportRepository.count({
          where: {
            event_time: Between(fromDate, toDate),
          },
        }),
      ).pipe(
        mergeMap((totalCount) => {
          const totalPages = Math.ceil(totalCount / take);
          return range(1, totalPages);
        }),
        mergeMap((page) =>
          this.getReportsByDateRange({ page, take }, { fromDate, toDate }),
        ),
        reduce((acc, reports) => acc.concat(reports), [] as CampaignReport[]),
      ),
    );
  }

  async findAggregatedEventCounts(
    request: GetItemsRequestDto,
  ): Promise<AggregatedEventCountDto[]> {
    const { from_date, to_date, event_name, take, page } = request;

    const fromDate = new Date(from_date);
    const toDate = new Date(to_date);

    const query = this.campaignReportRepository
      .createQueryBuilder('campaign_report')
      .select('campaign_report.ad_id', 'ad_id')
      .addSelect('DATE(campaign_report.event_time)', 'date')
      .addSelect('COUNT(*)', 'event_count')
      .where('campaign_report.event_name = :event_name', { event_name })
      .andWhere('campaign_report.event_time BETWEEN :fromDate AND :toDate', {
        fromDate,
        toDate,
      })
      .groupBy('campaign_report.ad_id')
      .addGroupBy('DATE(campaign_report.event_time)')
      .orderBy('date', 'ASC')
      .addOrderBy('campaign_report.ad_id', 'ASC');

    if (page && take) {
      query.take(take);
      query.skip((page - 1) * take);
    }

    this.logger.debug(`Executing query: ${query.getSql()}`);

    return await query.getRawMany();
  }
}
