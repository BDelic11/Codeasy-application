import { Module } from '@nestjs/common';
import { PointsService } from './points.service';
import { PointsController } from './points.controller';
import { RoutesService } from 'src/routes/routes.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [PointsController],
  providers: [PointsService, RoutesService],
})
export class PointsModule {}
