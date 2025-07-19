import apiService from "./api/apiService";
import { Pagination, UsersResponse, DetailedUser } from "@types";

const usersService = {
  getUsers: async ({ page, perPage }: Pagination) => {
    const userResponse = await apiService.get<UsersResponse>("/users", {
      params: {
        page,
        perPage,
      },
    });

    return userResponse.data;
  },
  createUser: async (user: Omit<DetailedUser, 'id'>) => {
    const userResponse = await apiService.post(`/users`, user);

    return userResponse.data;
  },
  updateUser: async ({ id, ...user }: DetailedUser) => {
    const userResponse = await apiService.patch(`/users/${id}`, user);

    return userResponse.data;
  },
  deleteUser: async (id: number) => {
    await apiService.delete(`/users/${id}`);
  },
};

export default usersService;
