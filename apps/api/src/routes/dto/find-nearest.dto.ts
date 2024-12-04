import { IsNumber, IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class FindNearestRoutesDto {
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  lat: number;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  lon: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  count?: number;
}
