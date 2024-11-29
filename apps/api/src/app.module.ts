import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoutesModule } from './routes/routes.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    RoutesModule,
    CacheModule.register({ ttl: 60 * 200, isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
