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
