import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, Validate } from 'class-validator';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { EventName } from 'src/shared/enums/campaign-report/event-name.enum';
import { ISO8601DateValidator } from 'src/shared/validators/ISO8601-date.validator';

export class GetCampaignReportsRequestDto extends PaginationDto {
  @ApiProperty({
    description: 'Start date in ISO 8601 format',
    example: '2025-02-01T00:00:00Z',
    required: true,
  })
  @Validate(ISO8601DateValidator)
  from_date: string;

  @ApiProperty({
    description: 'End date in ISO 8601 format',
    example: '2025-02-28T23:59:59Z',
    required: true,
  })
  @Validate(ISO8601DateValidator)
  to_date: string;

  @ApiProperty({ description: 'Event name', enum: EventName, required: true })
  @IsEnum(EventName, {
    message: `event_name must be one of: ${Object.values(EventName).join(', ')}`,
  })
  @Validate(ISO8601DateValidator)
  event_name: EventName;
}
