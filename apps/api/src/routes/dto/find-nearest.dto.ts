import { IsNumber, IsOptional, IsPositive } from 'class-validator';
import { Transform } from 'class-transformer';

export class FindNearestRoutesDto {
  @IsNumber()
  @IsPositive()
  lat: number;

  @IsNumber()
  @IsPositive()
  lon: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  count?: number;
}
