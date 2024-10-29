import { axiosInstance } from "../axiosInstance";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/auth/login/", {
      user_email: email,
      user_password: password,
    });
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const registerUser = async (
  email: string,
  password: string,
  confirmPassword: string,
  firstName: string,
  lastName: string
) => {
  try {
    const response = await axiosInstance.post("/user/", {
      user_password: password,
      user_password_repeat: confirmPassword,
      user_email: email,
      user_firstname: firstName,
      user_lastname: lastName,
    });
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};
