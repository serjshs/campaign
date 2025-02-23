import {
  IsString,
  IsNumber,
  IsOptional,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class PaginationDto {
  @IsUrl()
  next: string;
}

class DataDto {
  @IsString()
  csv: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => PaginationDto)
  pagination?: PaginationDto;
}

export class GetCampaignReportsResponseDto {
  @IsNumber()
  timestamp: number;

  @ValidateNested()
  @Type(() => DataDto)
  data: DataDto;
}
