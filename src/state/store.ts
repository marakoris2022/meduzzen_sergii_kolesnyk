import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import userReducer from "./user/userSlice";
import usersSlice from "./users/usersSlice";
import companiesSlice from "./companies/companiesSlice";
import userCompaniesSlice from "./user-companies/userCompaniesSlice";
import companyByIdSlice from "./company-by-id/companyByIdSlice";
import quizzesSlice from "./quizzes/quizzesSlice";
import quizByIdSlice from "./quiz-by-id/quizByIdSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      user: userReducer,
      userCompanies: userCompaniesSlice,
      users: usersSlice,
      companies: companiesSlice,
      companyById: companyByIdSlice,
      quizzes: quizzesSlice,
      quizById: quizByIdSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
