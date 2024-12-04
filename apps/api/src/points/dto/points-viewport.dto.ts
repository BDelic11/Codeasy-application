import { IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class PointsViewportDto {
  @Type(() => Number)
  @IsNumber()
  @Min(-90, { message: 'Latitude must be greater than or equal to -90.' })
  @Max(90, { message: 'Latitude must be less than or equal to 90.' })
  lat1: number;

  @Type(() => Number)
  @IsNumber()
  @Min(-180, { message: 'Longitude must be greater than or equal to -180.' })
  @Max(180, { message: 'Longitude must be less than or equal to 180.' })
  lng1: number;

  @Type(() => Number)
  @IsNumber()
  @Min(-90, { message: 'Latitude must be greater than or equal to -90.' })
  @Max(90, { message: 'Latitude must be less than or equal to 90.' })
  lat2: number;

  @Type(() => Number)
  @IsNumber()
  @Min(-180, { message: 'Longitude must be greater than or equal to -180.' })
  @Max(180, { message: 'Longitude must be less than or equal to 180.' })
  lng2: number;
}
