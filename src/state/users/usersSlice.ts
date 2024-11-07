import { UserProps } from "@/interface/interface";
import { getUserById, getUsers } from "@/services/axios-api-methods/axiosGet";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

const MockUserData = {
  user_id: 0,
  user_email: "",
  user_firstname: "",
  user_lastname: "",
  user_avatar: null,
  user_status: "",
  user_city: "",
  user_phone: "",
  user_links: [],
  is_superuser: false,
};

type InitialStateProps = {
  pageCount: number;
  pageNumber: number;
  usersData: null | UserProps[];
  loading: boolean;
  error: string | null;
};

const initialState: InitialStateProps = {
  pageCount: 1,
  pageNumber: 1,
  usersData: null,
  loading: false,
  error: null,
};

export const fetchUserDataById = createAsyncThunk(
  "users/fetchUserDataById",
  async (id: number, { rejectWithValue, getState }) => {
    try {
      const response = await getUserById(id);
      const newData = (getState() as RootState).users.usersData;
      const updateData = newData!.map((user) => {
        return user.user_id === response.user_id ? response : user;
      });

      return updateData;
    } catch {
      return rejectWithValue("errorUsersData");
    }
  }
);

export const fetchUsersData = createAsyncThunk(
  "users/fetchUsersData",
  async (pageNumber: number, { rejectWithValue, dispatch }) => {
    try {
      const { result } = await getUsers(pageNumber);
      const usersData = result.users.map((user) => ({
        ...MockUserData,
        ...user,
      }));
      dispatch(setPageNumber(pageNumber));
      dispatch(setPageCount(result.pagination.total_page));
      return usersData;
    } catch {
      return rejectWithValue("errorUsersData");
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setPageCount: (state, action) => {
      state.pageCount = action.payload;
    },
    setUsersData: (state, action) => {
      state.usersData = action.payload;
    },
    clearUsersData: (state) => {
      state.usersData = null;
      state.pageCount = 1;
      state.pageNumber = 1;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersData.fulfilled, (state, action) => {
        state.loading = false;
        state.usersData = action.payload;
      })
      .addCase(fetchUsersData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUserDataById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDataById.fulfilled, (state, action) => {
        state.loading = false;
        state.usersData = action.payload;
      })
      .addCase(fetchUserDataById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUsersData, setPageNumber, setPageCount } = usersSlice.actions;
export default usersSlice.reducer;
