import { CompanyPropsInList } from "@/interface/interface";
import { getCompanyListByUserId } from "@/services/axios-api-methods/axiosGet";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type InitialStateProps = {
  companies: CompanyPropsInList[];
  loading: boolean;
  error: null | string;
};

const initialState: InitialStateProps = {
  companies: [],
  loading: false,
  error: null,
};

export const fetchUserCompanies = createAsyncThunk(
  "userCompanies/fetchUserCompanies",
  async (userId: number, { rejectWithValue }) => {
    try {
      const res = await getCompanyListByUserId(userId);
      return res;
    } catch {
      return rejectWithValue("errorCompaniesList");
    }
  }
);

const userCompaniesSlice = createSlice({
  name: "userCompanies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = action.payload;
      })
      .addCase(fetchUserCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userCompaniesSlice.reducer;
