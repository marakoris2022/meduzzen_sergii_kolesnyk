import { logout } from "@/utils/logout";

export const useLogout = () => {
  return () => {
    logout();
  };
};
