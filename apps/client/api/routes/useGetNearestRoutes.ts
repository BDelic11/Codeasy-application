import { Route } from "../../../api/src/routes/entities/route.entity";
import { FindNearestRoutesDto } from "../../../api/src/routes/dto/find-nearest.dto";
import { QueryOptions, useQuery } from "react-query";

import { api } from "..";

const getNearestRoutes = async (nearestDto: any): Promise<any[]> => {
  const { lat, lon, count } = nearestDto;
  return await api.get<never, any[]>(`/routes/nearest`, {
    params: {
      lat,
      lon,
      count,
    },
  });
};

export const useGetNearestRoutes = (
  dto: any,
  options?: QueryOptions<Route[]>
) => {
  return useQuery(
    ["routes", "nearest", dto.lat, dto.lon, dto.count],
    () => getNearestRoutes(dto),
    {
      enabled: !!dto.lat && !!dto.lon && !!dto.count,
      ...options,
    }
  );
};
