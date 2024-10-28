import { configureStore } from "@reduxjs/toolkit";
import stringReducer from "./string/stringSlice";

export const makeStore = () => {
  return configureStore({
    reducer: { string: stringReducer },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
