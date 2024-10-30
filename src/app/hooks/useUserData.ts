import { TOKEN } from "@/interface/interface";
import { useAppSelector, useAppDispatch } from "@/state/hooks";
import { useEffect, useState } from "react";
import { fetchUserData } from "@/state/user/userSlice";

export function useUserData() {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user.data);
  const isUserDataLoading = useAppSelector((state) => state.user.loading);

  const [isLoading, setIsLoading] = useState<boolean>(Boolean(!userData));

  useEffect(() => {
    if (!userData && !isUserDataLoading) {
      const token = localStorage.getItem(TOKEN.NAME);
      if (token) {
        dispatch(fetchUserData()).then(() => setIsLoading(false));
      } else {
        setIsLoading(false);
      }
    }
  }, [userData, isUserDataLoading, dispatch]);

  return { userData, isLoading };
}
