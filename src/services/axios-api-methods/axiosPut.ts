import { axiosInstance } from "../axiosInstance";

export type UpdateUserGeneralProps = {
  user_firstname: string;
  user_lastname: string;
  user_status: string;
  user_city: string;
  user_phone: string;
  user_links: string[];
};

export const updateUserGeneralData = async (
  data: UpdateUserGeneralProps,
  userId: number
) => {
  return await axiosInstance.put(`/user/${userId}/update_info/`, {
    ...data,
  });
};
