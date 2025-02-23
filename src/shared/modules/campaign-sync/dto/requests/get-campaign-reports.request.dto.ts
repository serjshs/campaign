import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsEnum } from 'class-validator';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { EventName } from 'src/shared/enums/campaign-report/event-name.enum';

export class GetCampaignReportsRequestDto extends PaginationDto {
  @ApiProperty({
    description: 'Start date in ISO 8601 format',
    example: '2025-02-01T00:00:00Z',
    required: true,
  })
  @IsISO8601({ strict: true }, { message: 'Invalid ISO 8601 date format' })
  from_date: string;

  @ApiProperty({
    description: 'End date in ISO 8601 format',
    example: '2025-02-28T23:59:59Z',
    required: true,
  })
  @IsISO8601({ strict: true }, { message: 'Invalid ISO 8601 date format' })
  to_date: string;

  @ApiProperty({ description: 'Event name', enum: EventName, required: true })
  @IsEnum(EventName, {
    message: `event_name must be one of: ${Object.values(EventName).join(', ')}`,
  })
  event_name: EventName;
}
