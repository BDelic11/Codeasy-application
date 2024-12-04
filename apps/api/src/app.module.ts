import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoutesModule } from './routes/routes.module';
import { CacheModule } from '@nestjs/cache-manager';
import { PointsModule } from './points/points.module';

@Module({
  imports: [
    RoutesModule,
    CacheModule.register({ ttl: 60 * 200, isGlobal: true }),
    PointsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
