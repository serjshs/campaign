import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import moment from 'moment';
import { EMPTY, from, Observable, of } from 'rxjs';
import {
  expand,
  catchError,
  concatMap,
  retry,
  mergeMap,
  map,
} from 'rxjs/operators';
import { CampaignSyncService } from 'src/shared/modules/campaign-sync/campaign-sync.service';
import { GetCampaignReportsRequestDto } from 'src/shared/modules/campaign-sync/dto/requests/get-campaign-reports.request.dto';
import { GetCampaignReportsResponseDto } from 'src/shared/modules/campaign-sync/dto/responses/get-campaign-reports.response.dto';
import { EventName } from 'src/shared/enums/campaign-report/event-name.enum';
import { CampaignReportDao } from 'src/modules/campaign-report/campaign-report.dao';
import { CampaignReportMapper } from './campaign-report.mapper';
import { CampaignReportDto } from '../campaign-report/dto/campaign-report.dto';

@Injectable()
export class CampaignReportSchedulerService {
  private readonly logger = new Logger(CampaignReportSchedulerService.name);
  private readonly MAX_CONCURRENT_DB_SAVES = 5;
  private readonly TAKE_PER_REQUEST = 1000;

  constructor(
    private readonly campaignSyncService: CampaignSyncService,
    private readonly campaignReportMapper: CampaignReportMapper,
    private readonly campaignReportDao: CampaignReportDao,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  fetchAndSaveCampaignReports(): void {
    this.logger.log('Fetching campaign reports...');
    from(Object.values(EventName))
      .pipe(mergeMap((eventName: EventName) => this.processEvent$(eventName)))
      .subscribe({
        complete: () => this.logger.log('All campaign reports processed.'),
        error: (err: Error) =>
          this.logger.error('Error processing campaign reports', err),
      });
  }

  private processEvent$(eventName: EventName): Observable<void> {
    return this.fetchAndSaveReports$({
      ...this.getDateRange(),
      event_name: eventName,
      take: this.TAKE_PER_REQUEST,
      page: 1,
    });
  }

  private mapCsvToEntities$(
    response: GetCampaignReportsResponseDto,
  ): Observable<CampaignReportDto[]> {
    return response.data.csv?.length
      ? from(this.campaignReportMapper.mapCsvToEntities(response.data.csv))
      : of([]);
  }

  private saveReports$(entities: CampaignReportDto[]): Observable<void> {
    return entities.length
      ? from(this.campaignReportDao.saveReports(entities))
      : of();
  }

  private fetchAndSaveReports$(
    params: GetCampaignReportsRequestDto,
  ): Observable<void> {
    return from(this.fetchReports(params)).pipe(
      map((response) => ({ response, currentPage: params.page ?? 1 })),
      expand(({ response, currentPage }) =>
        response.data.pagination?.next
          ? from(this.fetchReports({ ...params, page: currentPage + 1 })).pipe(
              map((nextResponse) => ({
                response: nextResponse,
                currentPage: currentPage + 1,
              })),
            )
          : EMPTY,
      ),
      concatMap(({ response }) => this.mapCsvToEntities$(response)),
      mergeMap(
        (entities: CampaignReportDto[]) => this.saveReports$(entities),
        this.MAX_CONCURRENT_DB_SAVES,
      ),
      retry({ count: 3, delay: 3000 }),
      catchError((error: Error) => {
        this.logger.error(
          `Error fetching reports for ${params.event_name}:`,
          error,
        );
        return of();
      }),
      map(() => undefined),
    );
  }

  private fetchReports(
    params: GetCampaignReportsRequestDto,
  ): Observable<GetCampaignReportsResponseDto> {
    this.logger.log(`Fetching reports: ${JSON.stringify(params)}`);
    return from(this.campaignSyncService.getCampaignReports(params)).pipe(
      catchError((error: Error) => {
        this.logger.error(`Failed to fetch reports: ${error.message}`);
        return EMPTY;
      }),
    );
  }

  private getDateRange(): { from_date: string; to_date: string } {
    return {
      from_date: moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
      to_date: moment().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
    };
  }
}
