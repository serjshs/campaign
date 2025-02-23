import { IsDateString, IsString, IsInt, Min } from 'class-validator';

export class GetAggregatedEventCountsRequestDto {
  @IsDateString()
  from_date: string;

  @IsDateString()
  to_date: string;

  @IsString()
  event_name: string;

  @IsInt()
  @Min(1)
  take: number;

  @IsInt()
  @Min(1)
  page: number;
}
