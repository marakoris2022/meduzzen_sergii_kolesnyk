"use client";
import { AppStore, makeStore } from "@/state/store";
import { useRef } from "react";
import { Provider } from "react-redux";

export const storeRef = { current: undefined as AppStore | undefined };

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const localStoreRef = useRef<AppStore>();

  if (!localStoreRef.current) {
    localStoreRef.current = makeStore();
    storeRef.current = localStoreRef.current;
  }

  return <Provider store={localStoreRef.current}>{children}</Provider>;
}
