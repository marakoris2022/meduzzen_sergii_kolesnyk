import { UserProps, UsersProps } from "@/interface/interface";
import { axiosInstance } from "../axiosInstance";

export const getHealthStatus = async () => {
  try {
    const response = await axiosInstance.get("/");
    return response.data;
  } catch (error) {
    console.error("Error in Health Status Check:", error);
    throw error;
  }
};

export const getMe = async () => {
  try {
    const response = await axiosInstance.get("/auth/me/");
    return response.data.result as UserProps;
  } catch (error) {
    console.error("Error in Get User Data:", error);
    throw error;
  }
};

export const getUsers = async (page: number = 1, page_size: number = 10) => {
  try {
    const response = await axiosInstance.get("/users/", {
      params: { page, page_size },
    });
    return response.data as UsersProps;
  } catch (error) {
    console.error("Error in Get User Data:", error);
    throw error;
  }
};
