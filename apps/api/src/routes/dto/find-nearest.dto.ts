import { IsLatitude, IsLongitude, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class FindNearestRoutesDto {
  @IsLatitude({ message: 'Latitude must be a number between -90 and 90' })
  lat: number;

  @IsLongitude({ message: 'Longitud must be a number between -180 and 180' })
  lng: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  count?: number;
}
