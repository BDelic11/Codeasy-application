// import { useMutation, useQueryClient } from "react-query";

// import { api } from "..";
// import { UserDto } from "@/types/user";

// const updateUser = async (dto: UserDto & { id: number }) => {
//   return await api.patch<UserDto, never>(`/users/${dto.id}`, {
//     ...dto,
//     id: undefined,
//   });
// };

// export const useUpdateUser = () => {
//   const queryClient = useQueryClient();

//   return useMutation(updateUser, {
//     onSuccess: () => {
//       queryClient.invalidateQueries(["users"]);
//       //   queryClient.invalidateQueries(['hairdressers', updatedCompany.id]);
//     },
//     onError: (error: string) => {
//       console.log(error);
//     },
//   });
// };
