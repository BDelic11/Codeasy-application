import { useMutation, useQueryClient } from "react-query";

import { api } from "..";
import { UserDto } from "@/types/user";

const deleteUser = async (id: number) => {
  return await api.delete<never, UserDto>(`/users/${id}`);
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      console.log("Uspjesno izbrisan korisnik!");
    },

    onError: (error: string) => {
      console.log(error);
    },
  });
};
