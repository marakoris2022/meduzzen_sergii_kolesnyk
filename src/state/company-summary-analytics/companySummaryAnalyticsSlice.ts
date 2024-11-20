import { SummaryRatingAnalyticProps } from "@/interface/interface";
import { getSummaryRatingAnalytic } from "@/services/axios-api-methods/axiosGet";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type InitialStateProps = {
  companyAnalytics: null | SummaryRatingAnalyticProps;
  loading: boolean;
  error: string;
};

const initialState: InitialStateProps = {
  companyAnalytics: null,
  loading: false,
  error: "",
};

export const fetchSummaryRatingAnalytic = createAsyncThunk(
  "companyAnalytics/fetchSummaryRatingAnalytic",
  async (companyId: number, { rejectWithValue }) => {
    try {
      return await getSummaryRatingAnalytic(companyId);
    } catch {
      return rejectWithValue("errorCompanyAnalytics");
    }
  }
);

const companyAnalyticsSlice = createSlice({
  name: "companyAnalytics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSummaryRatingAnalytic.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchSummaryRatingAnalytic.fulfilled, (state, action) => {
        state.loading = false;
        state.companyAnalytics = action.payload;
      })
      .addCase(fetchSummaryRatingAnalytic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {} = companyAnalyticsSlice.actions;
export default companyAnalyticsSlice.reducer;
