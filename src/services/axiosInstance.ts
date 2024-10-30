import axios from "axios";
import { PATHS, TOKEN } from "@/interface/interface";
import { storeRef } from "@/app/components/StoreProvider";
import { clearUserData } from "@/state/user/userSlice";
import { clearToken } from "@/state/auth/authSlice";

const BASE_URL = process.env.BASE_URL || "http://51.20.210.187";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = storeRef.current?.getState().auth.token;

    if (!token) {
      const localToken = localStorage.getItem(TOKEN.NAME);
      if (localToken) config.headers.Authorization = `Bearer ${localToken}`;
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const dispatch = storeRef.current?.dispatch;

      if (dispatch) {
        dispatch(clearUserData());
        dispatch(clearToken());
        window.location.href = PATHS.SIGNIN;
      }
    }

    return Promise.reject(error);
  }
);
