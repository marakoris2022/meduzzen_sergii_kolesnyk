"use client";

import { useAppSelector, useAppDispatch } from "@/state/hooks";
import { useEffect } from "react";
import { fetchUserData } from "@/state/user/userSlice";
import { TOKEN } from "@/interface/interface";

export function useUserData() {
  const dispatch = useAppDispatch();
  const { data, error, loading } = useAppSelector((state) => state.user);

  useEffect(() => {
    const token = Boolean(localStorage.getItem(TOKEN.NAME));
    if (!data && !loading && !error && token) {
      dispatch(fetchUserData());
    }
  }, [data, loading, dispatch, error]);

  return { userData: data, isLoading: loading, userDataError: error };
}
