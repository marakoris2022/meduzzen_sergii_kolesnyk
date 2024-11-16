import { axiosInstance } from "../axiosInstance";

export const deleteUser = async (user_id: number) => {
  return await axiosInstance.delete(`/user/${user_id}/`);
};

export const deleteCompany = async (company_id: number) => {
  return await axiosInstance.delete(`/company/${company_id}/`);
};

export const deleteQuiz = async (quiz_id: number) => {
  return await axiosInstance.delete(`/quiz/${quiz_id}/`);
};
