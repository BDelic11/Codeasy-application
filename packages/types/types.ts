export interface Geometry {
  type: "Polygon";
  coordinates: number[][][];
}

export interface Region {
  type: "Feature";
  geometry: Geometry;
  properties: Record<string, any>;
}

export interface Point {
  id: string;
  name: string;
  description: string;
  Region: Region;
  tags: string[];
}

export interface Route {
  id: string;
  name: string;
  description: string;
  difficulty: string;
  Points: Point[];
  estimatedTime: string;
  distance: string;
}

export interface RouteWithDistance extends Route {
  computedDistance: number; // Computed distance in kilometers
}
