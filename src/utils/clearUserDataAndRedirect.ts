import { storeRef } from "@/app/components/StoreProvider";
import { clearUserData } from "@/state/user/userSlice";
import { clearToken } from "@/state/auth/authSlice";
import { TOKEN, PATHS } from "@/interface/interface";
import Cookies from "js-cookie";

export const clearUserDataAndRedirect = () => {
  const dispatch = storeRef.current?.dispatch;

  if (dispatch) {
    dispatch(clearUserData());
    dispatch(clearToken());
  }

  localStorage.removeItem(TOKEN.NAME);
  Cookies.remove(TOKEN.NAME);

  window.location.href = PATHS.SIGNIN;
};
