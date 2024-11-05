import axios from "axios";
import { TOKEN } from "@/interface/interface";
import { storeRef } from "@/app/components/StoreProvider";
import { useLogout } from "../app/hooks/useLogout";
import { setToken } from "@/state/auth/authSlice";
import { isTokenExpired } from "@/utils/isTokenExpired";

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
    const store = storeRef.current;
    let token = store?.getState().auth.token;

    if (!token) {
      const localToken = localStorage.getItem(TOKEN.NAME);
      if (localToken) {
        token = localToken;
        store?.dispatch(setToken(localToken));
      }
    }

    if (token) {
      if (isTokenExpired(token)) {
        const logout = useLogout();
        logout();
        return Promise.reject("Token expired.");
      }

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
      if (error.response.data?.detail?.msg?.includes("signing key")) {
        const logout = useLogout();
        logout();
      }
    }

    return Promise.reject(error);
  }
);
