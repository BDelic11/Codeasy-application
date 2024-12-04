import { Controller, Get, Query } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { Route } from './entities/route.entity';

@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Get('nearest')
  findNearestRoutes(
    @Query('lat') lat: string,
    @Query('lon') lon: string,
    @Query('count') count: string,
  ) {
    const latNumber = parseFloat(lat);
    const lonNumber = parseFloat(lon);
    const countNumber = count ? parseInt(count, 10) : 10;

    return this.routesService.findNearestRoutes({
      lat: latNumber,
      lon: lonNumber,
      count: countNumber,
    });
  }

  @Get()
  async fetchRoutes(): Promise<Route[]> {
    return this.routesService.fetchAllRoutes(); // Already sanitized
  }
}
