import axios from "axios";
import { TOKEN } from "@/interface/interface";
import { storeRef } from "@/app/components/StoreProvider";

const BASE_URL = process.env.BASE_URL || "http://51.20.210.187";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 3000,
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
