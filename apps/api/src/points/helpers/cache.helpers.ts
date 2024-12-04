import { Cache } from 'cache-manager';
import { Point } from '../entities/point.entity';
import { Route } from 'src/routes/entities/route.entity';

/**
 * Fetches points from cache or extracts them from routes if not cached.
 */
export async function getCachedPoints(
  cacheManager: Cache,
  routes: Route[],
  extractPointsFn: (routes: Route[]) => Point[],
): Promise<Point[]> {
  let cachedPoints = await cacheManager.get<Point[]>('viewportPoints');

  if (!cachedPoints) {
    cachedPoints = extractPointsFn(routes);
    await cacheManager.set('viewportPoints', cachedPoints, 3600); // Cache for 1 hour
  }

  return cachedPoints;
}
