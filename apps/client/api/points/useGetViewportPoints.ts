import { PointsViewportDto } from "../../../api/src/points/dto/points-viewport.dto";
import { QueryOptions, useQuery } from "react-query";
import { Point } from "../../../api/src/points/entities/point.entity";

import { api } from "..";

const getViewportPoints = async (
  pointsViewportDto: PointsViewportDto
): Promise<Point[]> => {
  const { lat1, lng1, lat2, lng2 } = pointsViewportDto;
  return await api.get<never, any[]>(`/points/findPointsInViewport`, {
    params: {
      lat1,
      lng1,
      lat2,
      lng2,
    },
  });
};

export const useGetViewportPoints = (
  dto: PointsViewportDto,
  options?: QueryOptions<Point[]>
) => {
  return useQuery(
    ["points", "findPointsInViewport", dto.lat1, dto.lat2, dto.lng1, dto.lng2],
    () => getViewportPoints(dto),
    {
      enabled: !!dto.lat1 && !!dto.lng1 && !!dto.lat2 && !!dto.lng2,
      ...options,
    }
  );
};
