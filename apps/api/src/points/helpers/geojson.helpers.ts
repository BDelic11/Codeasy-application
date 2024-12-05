import { FeatureCollection, Feature, Point as GeoJSONPoint } from 'geojson';
import { Point } from '../entities/point.entity';

export function convertToGeoJSON(
  points: Point[],
): FeatureCollection<GeoJSONPoint> {
  const features = points.map((point) => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: point.region.geometry.coordinates[0][0],
    },
    properties: { ...point },
  }));

  return {
    type: 'FeatureCollection',
    features: features as Feature<GeoJSONPoint>[],
  };
}
