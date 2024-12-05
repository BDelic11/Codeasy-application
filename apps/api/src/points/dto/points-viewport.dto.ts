import { Type } from 'class-transformer';
import { IsLatitude, IsLongitude } from 'class-validator';

export class PointsViewportDto {
  @IsLatitude({ message: 'Latitude must be a number between -90 and 90' })
  @Type(() => Number)
  lat1: number;

  @IsLongitude({ message: 'Longitude must be a number between -180 and 180' })
  @Type(() => Number)
  lng1: number;

  @IsLatitude({ message: 'Latitude must be a number between -90 and 90' })
  @Type(() => Number)
  lat2: number;

  @IsLongitude({ message: 'Longitude must be a number between -180 and 180' })
  @Type(() => Number)
  lng2: number;
}
