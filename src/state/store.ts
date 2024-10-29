import { configureStore } from "@reduxjs/toolkit";
import stringReducer from "./string/stringSlice";
import authReducer from "./auth/authSlice";

export const makeStore = () => {
  return configureStore({
    reducer: { string: stringReducer, auth: authReducer },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
