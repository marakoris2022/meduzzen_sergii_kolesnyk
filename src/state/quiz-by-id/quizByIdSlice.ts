import { QuizByIdProps } from "@/interface/interface";
import { getQuizById } from "@/services/axios-api-methods/axiosGet";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type InitialStateProps = {
  quiz: null | QuizByIdProps;
  loading: boolean;
  error: string;
};

const initialState: InitialStateProps = {
  quiz: null,
  loading: false,
  error: "",
};

export const fetchQuizByIdData = createAsyncThunk(
  "quizById/fetchQuizByIdData",
  async (quizId: number, { rejectWithValue }) => {
    try {
      return await getQuizById(quizId);
    } catch {
      return rejectWithValue("errorQuizByIdData");
    }
  }
);

const quizByIdSlice = createSlice({
  name: "quizById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizByIdData.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchQuizByIdData.fulfilled, (state, action) => {
        state.loading = false;
        state.quiz = action.payload;
      })
      .addCase(fetchQuizByIdData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {} = quizByIdSlice.actions;
export default quizByIdSlice.reducer;
