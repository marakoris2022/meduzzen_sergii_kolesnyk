import { clearUserDataAndRedirect } from "@/utils/clearUserDataAndRedirect";

export const useLogout = () => {
  return () => {
    clearUserDataAndRedirect();
  };
};
