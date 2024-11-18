import {
  CreateQuizProps,
  QuizAnswersBody,
  QuizQuestionsProps,
} from "@/interface/interface";
import { axiosInstance } from "../axiosInstance";

export const loginUser = async (email: string, password: string) => {
  const { data } = await axiosInstance.post("/auth/login/", {
    user_email: email,
    user_password: password,
  });
  return data;
};

export const registerUser = async (
  email: string,
  password: string,
  confirmPassword: string,
  firstName: string,
  lastName: string
) => {
  const { data } = await axiosInstance.post("/user/", {
    user_password: password,
    user_password_repeat: confirmPassword,
    user_email: email,
    user_firstname: firstName,
    user_lastname: lastName,
  });
  return data;
};

export const createCompany = async (
  company_name: string,
  is_visible: boolean
) => {
  const { data } = await axiosInstance.post("/company/", {
    company_name,
    is_visible,
  });
  return data;
};

export const createQuiz = async (
  requestData: CreateQuizProps,
  companyId: number
) => {
  return await axiosInstance.post("/quiz/", {
    ...requestData,
    company_id: companyId,
  });
};

export const addQuizQuestion = async (
  requestData: QuizQuestionsProps,
  quiz_id: number
) => {
  return await axiosInstance.post(`/quiz/${quiz_id}/add_question/`, {
    ...requestData,
  });
};

export const takeQuizAnswers = async (
  answers: QuizAnswersBody,
  quiz_id: number
) => {
  return await axiosInstance.post(`/quiz/${quiz_id}/take_quiz/`, {
    ...answers,
  });
};
