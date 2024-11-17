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

export const fetchQuizById = createAsyncThunk(
  "quizById/fetchQuizById",
  async (quizId: number, { rejectWithValue }) => {
    try {
      return await getQuizById(quizId);
    } catch {
      return rejectWithValue("errorQuizById");
    }
  }
);

const quizByIdSlice = createSlice({
  name: "quizById",
  initialState,
  reducers: {
    clearQuizData: (state) => {
      state.quiz = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizById.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchQuizById.fulfilled, (state, action) => {
        state.loading = false;
        state.quiz = action.payload;
      })
      .addCase(fetchQuizById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearQuizData } = quizByIdSlice.actions;
export default quizByIdSlice.reducer;
