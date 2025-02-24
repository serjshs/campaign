import { Injectable } from '@nestjs/common';
import neatCsv from 'neat-csv';
import { CampaignReportDto } from 'src/modules/campaign-report/dto/campaign-report.dto';

interface CsvRow {
  campaign: string;
  campaign_id: string;
  adgroup: string;
  adgroup_id: string;
  ad: string;
  ad_id: string;
  client_id: string;
  event_name: string;
  event_time: string;
}

@Injectable()
export class CampaignReportMapper {
  async mapCsvToEntities(csvData: string): Promise<CampaignReportDto[]> {
    const rows: CsvRow[] = await neatCsv(csvData);
    return rows.map((row) => ({
      ...row,
      event_time: new Date(row.event_time),
    }));
  }
}
