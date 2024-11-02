import { configureStore } from "@reduxjs/toolkit";
import stringReducer from "./string/stringSlice";
import authReducer from "./auth/authSlice";
import userReducer from "./user/userSlice";
import usersSlice from "./users/usersSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      string: stringReducer,
      auth: authReducer,
      user: userReducer,
      users: usersSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
