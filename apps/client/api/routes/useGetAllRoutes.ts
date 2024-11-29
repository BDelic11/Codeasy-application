import { Route } from "../../../api/src/routes/entities/route.entity";
import { FindNearestRoutesDto } from "../../../api/src/routes/dto/find-nearest.dto";
import { QueryOptions, useQuery } from "react-query";

import { api } from "..";

const getAllRoutes = async ({ lat, lon, query }: FindNearestRoutesDto) => {
  return await api.get<never, Route[]>(`/routes`);
};

export const useGetAllRoutes = (options?: QueryOptions<Route[]>) => {
  return useQuery(["routes", lat, lon, query], () => getAllRoutes(), {
    ...options,
  });
};
