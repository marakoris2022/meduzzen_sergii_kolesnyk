import { QuizItem } from "@/interface/interface";
import { fetchQuizList } from "@/services/axios-api-methods/axiosGet";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type InitialStateProps = {
  quizList: QuizItem[];
  loading: boolean;
  error: string;
};

const initialState: InitialStateProps = {
  quizList: [],
  loading: false,
  error: "",
};

export const fetchQuizzesData = createAsyncThunk(
  "quizzes/fetchQuizzesData",
  async (companyId: number, { rejectWithValue }) => {
    try {
      return await fetchQuizList(companyId);
    } catch {
      return rejectWithValue("errorQuizzesData");
    }
  }
);

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizzesData.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchQuizzesData.fulfilled, (state, action) => {
        state.loading = false;
        state.quizList = action.payload;
      })
      .addCase(fetchQuizzesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {} = quizzesSlice.actions;
export default quizzesSlice.reducer;
