import { UserProps, UsersProps } from "@/interface/interface";
import { axiosInstance } from "../axiosInstance";

export const getHealthStatus = async () => {
  const response = await axiosInstance.get("/");
  return response.data;
};

export const getMe = async () => {
  const response = await axiosInstance.get("/auth/me/");
  return response.data.result as UserProps;
};

export const getUsers = async (page: number = 1, page_size: number = 10) => {
  const response = await axiosInstance.get("/users/", {
    params: { page, page_size },
  });
  return response.data as UsersProps;
};

export const getUserById = async (userId: number) => {
  const response = await axiosInstance.get(`/user/${userId}/`);
  return response.data as UserProps;
};
