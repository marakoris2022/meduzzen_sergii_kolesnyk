import { UserProps } from "@/interface/interface";
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
