import { useMutation, useQueryClient } from "react-query";

import { api } from "..";
import { UserDto } from "@/types/user";
import { toast } from "@/hooks/use-toast";

const createUser = async (dto: UserDto) => {
  return await api.post<UserDto, boolean>("/users", dto);
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation(createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast({
        title: "User Created",
        description: "The user has been created successfully.",
      });
    },
    onError: (error: string) => {
      toast({
        title: error,
        description: "Try again",
      });
    },
  });
};
