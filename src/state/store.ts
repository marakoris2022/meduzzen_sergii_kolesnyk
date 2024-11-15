import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import userReducer from "./user/userSlice";
import usersSlice from "./users/usersSlice";
import companiesSlice from "./companies/companiesSlice";
import userCompaniesSlice from "./user-companies/userCompaniesSlice";
import companyByIdSlice from "./company-by-id/companyByIdSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      user: userReducer,
      userCompanies: userCompaniesSlice,
      users: usersSlice,
      companies: companiesSlice,
      companyById: companyByIdSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
