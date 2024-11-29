import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async getHello() {
    // await this.cacheManager.set('routes', data); // Cache for 1 second
    const cachedItem = await this.cacheManager.get('routes');
    console.log(cachedItem);
    return 'Hello World!';
  }
}
