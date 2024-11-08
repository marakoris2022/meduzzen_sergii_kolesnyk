import { CompaniesProps, UserProps, UsersProps } from "@/interface/interface";
import { axiosInstance } from "../axiosInstance";

export const getHealthStatus = async () => {
  const { data } = await axiosInstance.get("/");
  return data;
};

export const getMe = async () => {
  const { data } = await axiosInstance.get("/auth/me/");
  return data.result as UserProps;
};

export const getUsers = async (page: number = 1, page_size: number = 10) => {
  const { data } = await axiosInstance.get("/users/", {
    params: { page, page_size },
  });
  return data as UsersProps;
};

export const getUserById = async (userId: number) => {
  const { data } = await axiosInstance.get(`/user/${userId}/`);
  return data.result as UserProps;
};

export const getAllCompanies = async (
  page: number = 1,
  page_size: number = 9
) => {
  const { data } = await axiosInstance.get("/companies/", {
    params: { page, page_size },
  });
  return data as CompaniesProps;
};
