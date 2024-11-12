import { RequestCompanyProps } from "@/interface/interface";
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

export const updateUserAvatar = async (file: File, userId: number) => {
  return await axiosInstance.put(
    `/user/${userId}/update_avatar/`,
    { file },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const updateCompanyData = async (
  company_id: number,
  updatedData: RequestCompanyProps
) => {
  return await axiosInstance.put(`/company/${company_id}/update_info/`, {
    ...updatedData,
  });
};

export const updateCompanyVisible = async (
  company_id: number,
  is_visible: boolean
) => {
  return await axiosInstance.put(`/company/${company_id}/update_visible/`, {
    is_visible,
  });
};

export const updateCompanyAvatar = async (file: File, company_id: number) => {
  return await axiosInstance.put(
    `/company/${company_id}/update_avatar/`,
    { file },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
