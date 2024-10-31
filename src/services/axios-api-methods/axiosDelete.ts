import { axiosInstance } from "../axiosInstance";

export const deleteUser = async (user_id: number) => {
  try {
    const response = await axiosInstance.delete(`/user/${user_id}/`);
    return response;
  } catch (error) {
    console.error("Error in Get User Data:", error);
    throw error;
  }
};
