import { CompanyProps } from "@/interface/interface";
import { getAllCompanies } from "@/services/axios-api-methods/axiosGet";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type InitialStateProps = {
  pageCount: number;
  pageNumber: number;
  companiesData: null | CompanyProps[];
  loading: boolean;
  error: string | null;
};

const initialState: InitialStateProps = {
  pageCount: 1,
  pageNumber: 1,
  companiesData: null,
  loading: false,
  error: null,
};

export const fetchCompaniesData = createAsyncThunk(
  "users/fetchCompaniesData",
  async (pageNumber: number, { rejectWithValue, dispatch }) => {
    try {
      const { result } = await getAllCompanies(pageNumber);
      dispatch(setCompaniesPageNumber(pageNumber));
      dispatch(setCompaniesPageCount(result.pagination.total_page));
      return result.companies;
    } catch {
      return rejectWithValue("errorCompaniesData");
    }
  }
);

const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    setCompaniesPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setCompaniesPageCount: (state, action) => {
      state.pageCount = action.payload;
    },
    setCompaniesData: (state, action) => {
      state.companiesData = action.payload;
    },
    clearCompaniesData: (state) => {
      state.companiesData = null;
      state.pageCount = 1;
      state.pageNumber = 1;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompaniesData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompaniesData.fulfilled, (state, action) => {
        state.loading = false;
        state.companiesData = action.payload;
      })
      .addCase(fetchCompaniesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setCompaniesData,
  setCompaniesPageNumber,
  setCompaniesPageCount,
} = companiesSlice.actions;
export default companiesSlice.reducer;
