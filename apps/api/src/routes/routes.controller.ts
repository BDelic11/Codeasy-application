import { Controller, Get, Query } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { Route } from './entities/route.entity';
import { FindNearestRoutesDto } from './dto/find-nearest.dto';

@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Get('findNearestRoutes')
  async findNearestRoutes(@Query() findNearestRoutesDto: FindNearestRoutesDto) {
    return this.routesService.findNearestRoutes({
      ...findNearestRoutesDto,
    });
  }

  @Get()
  async fetchRoutes(): Promise<Route[]> {
    return this.routesService.fetchAllRoutes();
  }
}
