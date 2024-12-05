import { Route } from "../../../api/src/routes/entities/route.entity";
import { FindNearestRoutesDto } from "../../../api/src/routes/dto/find-nearest.dto";
import { QueryOptions, useQuery } from "react-query";

import { api } from "..";

const getNearestRoutes = async (
  nearestDto: FindNearestRoutesDto
): Promise<Route[]> => {
  const { lat, lng, count } = nearestDto;
  return await api.get<never, Route[]>(`/routes/findNearestRoutes`, {
    params: {
      lat,
      lng,
      count,
    },
  });
};

export const useGetNearestRoutes = (
  dto: FindNearestRoutesDto,
  options?: QueryOptions<Route[]>
) => {
  return useQuery(
    ["routes", "findNearestRoutes", dto.lat, dto.lng, dto.count],
    () => getNearestRoutes(dto),
    {
      enabled: !!dto.lat && !!dto.lng && !!dto.count,
      ...options,
    }
  );
};
