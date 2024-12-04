import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PointsService } from './points.service';
import { PointsViewportDto } from './dto/points-viewport.dto';

@Controller('points')
export class PointsController {
  constructor(private readonly pointsService: PointsService) {}

  @Get('viewport')
  findAll(@Query() pointsInViewportDto: PointsViewportDto) {
    return this.pointsService.findPointsInViewport({
      lat1: pointsInViewportDto.lat1,
      lng1: pointsInViewportDto.lng1,
      lat2: pointsInViewportDto.lat2,
      lng2: pointsInViewportDto.lng2,
    });
  }
}
