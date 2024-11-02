import { axiosInstance } from "../axiosInstance";

export type UpdateUserGeneralProps = {
  user_firstname: string;
  user_lastname: string;
  user_status: string;
  user_city: string;
  user_phone: string;
  user_links: string[];
};

export type UpdateUserPasswordProps = {
  user_password: string;
  user_password_repeat: string;
  user_id: number;
};

export const updateUserGeneralData = async (
  data: UpdateUserGeneralProps,
  userId: number
) => {
  return await axiosInstance.put(`/user/${userId}/update_info/`, {
    ...data,
  });
};

export const updateUserPassword = async (data: UpdateUserPasswordProps) => {
  const { user_password, user_password_repeat, user_id } = data;
  return await axiosInstance.put(`/user/${user_id}/update_password/`, {
    user_password,
    user_password_repeat,
  });
};
