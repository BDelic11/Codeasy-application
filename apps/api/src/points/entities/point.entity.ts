export class Point {
  id: number;
  createdAt: string;
  region: {
    type: string;
    geometry: {
      type: string;
      coordinates: number[][][];
    };
    properties?: {
      center?: [number, number];
      radius?: number;
    };
  };
}
