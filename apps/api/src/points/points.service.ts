import { FeatureCollection } from 'geojson';
import { Point as GeoJSONPoint } from 'geojson';
//
import { Inject, Injectable } from '@nestjs/common';
import { PointsViewportDto } from './dto/points-viewport.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

import { Feature, Polygon } from 'geojson';
import geojsonRbush from 'geojson-rbush';

// Helpers
import { convertToGeoJSON } from './helpers/geojson.helpers';
// import {
//   isBoxPointInBoundingBox,
//   isPointInBoundingBox,
// } from './helpers/bounding-box.helpers';
import { Route } from 'src/routes/entities/route.entity';
import { Point } from './entities/point.entity';
import { RoutesService } from 'src/routes/routes.service';

@Injectable()
export class PointsService {
  private index = geojsonRbush();
  private currentBoundingBox: Feature<Polygon> | null = null;

  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly routesService: RoutesService,
  ) {}

  async findPointsInViewport(
    pointsInViewportDto: PointsViewportDto,
  ): Promise<Point[]> {
    const { lng1, lat1, lng2, lat2 } = pointsInViewportDto;

    const newBoundingBox: Feature<Polygon> = {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [lng1, lat1],
            [lng1, lat2],
            [lng2, lat2],
            [lng2, lat1],
            [lng1, lat1],
          ],
        ],
      },
      properties: {},
    };

    // get cached points
    let cachedAllPoints =
      await this.cacheManager.get<Point[]>('viewportPoints');

    if (!cachedAllPoints) {
      const routes = await this.cacheManager.get<Route[]>('routes');
      if (!routes) {
        const cachedRoutes = await this.routesService.fetchAllRoutes();
        console.log('Fetching routes first time from api');
        cachedAllPoints = this.extractAllPointsFromRoutes(cachedRoutes);
      } else {
        console.log('Using cached routes');
        cachedAllPoints = this.extractAllPointsFromRoutes(routes);
      }
      await this.cacheManager.set('viewportPoints', cachedAllPoints, 3600);
    }
    console.log('cachedAllPoints', cachedAllPoints.length);

    const geoJSONPoints = convertToGeoJSON(cachedAllPoints);
    console.log('geoJSONPoints', geoJSONPoints.features.length);

    // load points into the tree
    if (
      !this.currentBoundingBox ||
      this.currentBoundingBox === newBoundingBox
    ) {
      this.fillTreeWithBoundingBox(geoJSONPoints);
      console.log(
        'Index first time loaded with:',
        this.index.all().features.length,
      );
    }

    this.currentBoundingBox = newBoundingBox;

    // query points within the viewport
    const pointsInViewport = this.index.search(newBoundingBox);
    console.log('pointsInViewport', pointsInViewport.features.length);
    return pointsInViewport.features.map(
      (feature) => feature.properties,
    ) as Point[];
  }

  private fillTreeWithBoundingBox(
    // newBoundingBox: Feature<Polygon>,
    geoJSONPoints: FeatureCollection<GeoJSONPoint>,
  ) {
    this.index.clear();
    this.index.load(geoJSONPoints);
  }

  // private updateTreeWithBoundingBox(
  //   newBoundingBox: Feature<Polygon>,
  //   geoJSONPoints: FeatureCollection<GeoJSONPoint>,
  // ) {
  //   if (this.isNewBoxWider(newBoundingBox, this.currentBoundingBox)) {
  //     geoJSONPoints.features.forEach((feature) => {
  //       if (isPointInBoundingBox(feature, newBoundingBox)) {
  //         this.index.insert(feature);
  //       }
  //     });
  //     console.log('Adding points from index:');
  //   } else {
  //     // If the new bounding box is smaller, remove points outside the new bounding box
  //     const pointsInCurrentBox = this.index.search(this.currentBoundingBox!);

  //     console.log('pointsInCurrentBox', pointsInCurrentBox.features.length);
  //     // Remove points outside the new bounding box
  //     pointsInCurrentBox.features.forEach((feature) => {
  //       if (!isBoxPointInBoundingBox(feature, newBoundingBox)) {
  //         this.index.remove(feature);
  //       }
  //       console.log('Removing points from index:', feature.geometry);
  //     });
  //   }
  // }

  /**
   * Helper function to determine if the new bounding box is wider than the current one
   */
  // private isNewBoxWider(
  //   newBoundingBox: Feature<Polygon>,
  //   currentBoundingBox: Feature<Polygon> | null,
  // ): boolean {
  //   if (!currentBoundingBox) return true;

  //   const [newMinLng, newMinLat, newMaxLng, newMaxLat] =
  //     this.getBoundingBoxEdges(newBoundingBox);
  //   const [currMinLng, currMinLat, currMaxLng, currMaxLat] =
  //     this.getBoundingBoxEdges(currentBoundingBox);

  //   return (
  //     newMinLng <= currMinLng &&
  //     newMinLat <= currMinLat &&
  //     newMaxLng >= currMaxLng &&
  //     newMaxLat >= currMaxLat
  //   );
  // }

  /**
   * Helper function to extract bounding box edges (min/max lng/lat)
   */
  // private getBoundingBoxEdges(boundingBox: Feature<Polygon>): number[] {
  //   const coordinates = boundingBox.geometry.coordinates[0];
  //   const lats = coordinates.map((coord) => coord[1]);
  //   const lngs = coordinates.map((coord) => coord[0]);

  //   return [
  //     Math.min(...lngs), // Min longitude
  //     Math.min(...lats), // Min latitude
  //     Math.max(...lngs), // Max longitude
  //     Math.max(...lats), // Max latitude
  //   ];
  // }

  private extractAllPointsFromRoutes(routes: Route[]): Point[] {
    const points: Point[] = [];
    routes.forEach((route) =>
      route.pointsOnRoutes.forEach((pointWrapper) =>
        points.push(pointWrapper.point),
      ),
    );
    return points;
  }
}
