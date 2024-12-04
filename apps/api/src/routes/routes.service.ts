import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Route } from './entities/route.entity';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { FindNearestRoutesDto } from './dto/find-nearest.dto';

@Injectable()
export class RoutesService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}
  private readonly earthRadius = 6371;

  async fetchAllRoutes(): Promise<Route[]> {
    const routes = await firstValueFrom(
      this.httpService
        .get<Route[]>('https://chat.codeasy.com/api/public/job-application')
        .pipe(
          map((response: AxiosResponse<Route[]>) => response.data),
          tap((data) => {
            this.cacheManager.set('routes', data, 36000);
          }),
        ),
    );

    if (!routes) {
      throw new BadRequestException('Error in fetching routes from api');
    }
    return routes;
  }

  async findNearestRoutes(
    findNearestRoutesDto: FindNearestRoutesDto,
  ): Promise<Route[]> {
    const { lon, lat, count } = findNearestRoutesDto;
    let routes: Route[] = (await this.cacheManager.get('routes')) as Route[];
    if (!routes) {
      routes = await this.fetchAllRoutes();
    }

    const distances = routes.map((route: Route) => {
      const centroid = this.calculateCentroid(route.pointsOnRoutes);
      const computedDistance = this.haversineDistance(
        Number(lat),
        Number(lon),
        centroid.lat,
        centroid.lng,
      );
      return { ...route, computedDistance };
    });

    distances.sort((a, b) => a.computedDistance - b.computedDistance);
    return distances.slice(0, count);
  }

  private calculateCentroid(points: any[]): { lat: number; lng: number } {
    let totalPoints = 0;
    let sumLat = 0;
    let sumLng = 0;

    points.forEach((pointWrapper) => {
      const coordinates = pointWrapper.point.region.geometry.coordinates[0];
      coordinates.forEach(([lng, lat]) => {
        sumLat += lat;
        sumLng += lng;
        totalPoints++;
      });
    });

    return { lat: sumLat / totalPoints, lng: sumLng / totalPoints };
  }

  private haversineDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const toRadians = (angle: number) => (angle * Math.PI) / 180;

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return this.earthRadius * c;
  }
}
