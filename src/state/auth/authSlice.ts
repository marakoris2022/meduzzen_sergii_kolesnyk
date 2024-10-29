import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TOKEN } from "@/interface/interface";

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem(TOKEN.NAME);
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export const selectAuthToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;