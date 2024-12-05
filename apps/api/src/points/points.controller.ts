import { Controller, Get, Query } from '@nestjs/common';
import { PointsService } from './points.service';
import { PointsViewportDto } from './dto/points-viewport.dto';

@Controller('points')
export class PointsController {
  constructor(private readonly pointsService: PointsService) {}

  @Get('findPointsInViewport')
  async findAll(@Query() pointsInViewportDto: PointsViewportDto) {
    return this.pointsService.findPointsInViewport({
      ...pointsInViewportDto,
    });
  }
}
