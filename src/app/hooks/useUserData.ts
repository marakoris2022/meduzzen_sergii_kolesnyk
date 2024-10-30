import { TOKEN } from "@/interface/interface";
import { useAppSelector, useAppDispatch } from "@/state/hooks";
import { useEffect, useState } from "react";
import { fetchUserData } from "@/state/user/userSlice";

export function useUserData() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.user.data);
  const loading = useAppSelector((state) => state.user.loading);

  const [isLoading, setIsLoading] = useState<boolean>(Boolean(!data));

  useEffect(() => {
    if (!data && !loading) {
      const token = localStorage.getItem(TOKEN.NAME);
      if (token) {
        dispatch(fetchUserData()).then(() => setIsLoading(false));
      } else {
        setIsLoading(false);
      }
    }
  }, [data, loading, dispatch]);

  return { userData: data, isLoading };
}
