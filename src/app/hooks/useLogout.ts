import { storeRef } from "../components/StoreProvider";
import { clearUserData } from "@/state/user/userSlice";
import { clearToken } from "@/state/auth/authSlice";
import { PATHS, TOKEN } from "@/interface/interface";
import Cookies from "js-cookie";

export const useLogout = () => {
  return () => {
    const dispatch = storeRef.current?.dispatch;

    if (dispatch) {
      dispatch(clearUserData());
      dispatch(clearToken());
    }

    localStorage.removeItem(TOKEN.NAME);
    Cookies.remove(TOKEN.NAME);

    window.location.href = PATHS.SIGNIN;
  };
};
