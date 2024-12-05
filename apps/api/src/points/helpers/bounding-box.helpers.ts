import { Feature, Polygon, Geometry, Point as GeoJSONPoint } from 'geojson';

export function isPointInBoundingBox(
  point: Feature<GeoJSONPoint>,
  boundingBox: Feature<Polygon>,
): boolean {
  const [lng, lat] = point.geometry.coordinates;
  const [[lng1, lat1], [lng2, lat2]] = boundingBox.geometry.coordinates[0];

  return (
    lat >= Math.min(lat1, lat2) &&
    lat <= Math.max(lat1, lat2) &&
    lng >= Math.min(lng1, lng2) &&
    lng <= Math.max(lng1, lng2)
  );
}

export function isBoxPointInBoundingBox(
  point: Feature<Geometry>,
  boundingBox: Feature<Polygon>,
): boolean {
  const [lng, lat] = point.geometry.bbox;
  const [[lng1, lat1], [lng2, lat2]] = boundingBox.geometry.coordinates[0];

  return (
    lat >= Math.min(lat1, lat2) &&
    lat <= Math.max(lat1, lat2) &&
    lng >= Math.min(lng1, lng2) &&
    lng <= Math.max(lng1, lng2)
  );
}
