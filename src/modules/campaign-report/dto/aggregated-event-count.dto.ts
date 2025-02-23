import { IsDate, IsInt, IsString } from 'class-validator';

export class AggregatedEventCountDto {
  @IsString()
  ad_id: string;

  @IsDate()
  date: Date;

  @IsInt()
  event_count: number;
}
