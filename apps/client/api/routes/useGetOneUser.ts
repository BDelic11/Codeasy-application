import { QueryOptions, useQuery } from "react-query";

import { api } from "..";
import { UserDto } from "@/types/user";

const getOneUser = async (id: number) => {
  return await api.get<never, UserDto>(`/services/${id}`);
};

export const useGetOneUser = (id?: number, options?: QueryOptions<UserDto>) => {
  return useQuery(["services", id], () => getOneUser(id!), {
    enabled: !!id,
    ...options,
  });
};
