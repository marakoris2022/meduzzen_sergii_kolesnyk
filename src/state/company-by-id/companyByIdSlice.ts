import { ActionProps, CompanyIdProps, UserItem } from "@/interface/interface";
import {
  getCompanyBlockedList,
  getCompanyById,
  getCompanyInvitesList,
  getCompanyMembersList,
  getCompanyRequestsList,
} from "@/services/axios-api-methods/axiosGet";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type InitialStateProps = {
  company: null | CompanyIdProps;
  companyError: string;
  companyMembers: Array<UserItem & ActionProps>;
  companyMembersError: string;
  companyInvites: Array<UserItem & ActionProps>;
  companyInvitesError: string;
  companyRequests: Array<UserItem & ActionProps>;
  companyRequestsError: string;
  companyBlockedList: Array<UserItem & ActionProps>;
  companyBlockedListError: string;
};

const initialState: InitialStateProps = {
  company: null,
  companyError: "",
  companyMembers: [],
  companyMembersError: "",
  companyInvites: [],
  companyInvitesError: "",
  companyRequests: [],
  companyRequestsError: "",
  companyBlockedList: [],
  companyBlockedListError: "",
};

export const fetchCompanyById = createAsyncThunk(
  "companyById/fetchCompanyById",
  async (companyId: number, { rejectWithValue }) => {
    try {
      return await getCompanyById(companyId);
    } catch {
      return rejectWithValue("errorCompaniesData");
    }
  }
);

export const fetchCompanyMembers = createAsyncThunk(
  "companyById/fetchCompanyMembers",
  async (companyId: number, { rejectWithValue }) => {
    try {
      return await getCompanyMembersList(companyId);
    } catch {
      return rejectWithValue("errorCompaniesData");
    }
  }
);

export const fetchCompanyInvites = createAsyncThunk(
  "companyById/fetchCompanyInvites",
  async (companyId: number, { rejectWithValue }) => {
    try {
      return await getCompanyInvitesList(companyId);
    } catch {
      return rejectWithValue("errorCompaniesData");
    }
  }
);

export const fetchCompanyRequests = createAsyncThunk(
  "companyById/fetchCompanyRequests",
  async (companyId: number, { rejectWithValue }) => {
    try {
      return await getCompanyRequestsList(companyId);
    } catch {
      return rejectWithValue("errorCompaniesData");
    }
  }
);

export const fetchCompanyBlockedList = createAsyncThunk(
  "companyById/fetchCompanyBlockedList",
  async (companyId: number, { rejectWithValue }) => {
    try {
      return await getCompanyBlockedList(companyId);
    } catch {
      return rejectWithValue("errorCompaniesData");
    }
  }
);

const companyByIdSlice = createSlice({
  name: "companyById",
  initialState,
  reducers: {
    clearCompanyState: (state) => {
      state.company = null;
      state.companyError = "";
      state.companyMembers = [];
      state.companyMembersError = "";
      state.companyInvites = [];
      state.companyInvitesError = "";
      state.companyRequests = [];
      state.companyRequestsError = "";
      state.companyBlockedList = [];
      state.companyBlockedListError = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyById.pending, (state) => {
        state.company = null;
        state.companyError = "";
      })
      .addCase(fetchCompanyById.fulfilled, (state, action) => {
        state.company = action.payload;
      })
      .addCase(fetchCompanyById.rejected, (state, action) => {
        state.companyError = action.payload as string;
      })

      .addCase(fetchCompanyMembers.pending, (state) => {
        state.companyMembers = [];
        state.companyMembersError = "";
      })
      .addCase(fetchCompanyMembers.fulfilled, (state, action) => {
        state.companyMembers = action.payload;
      })
      .addCase(fetchCompanyMembers.rejected, (state, action) => {
        state.companyMembersError = action.payload as string;
      })

      .addCase(fetchCompanyInvites.pending, (state) => {
        state.companyInvites = [];
        state.companyInvitesError = "";
      })
      .addCase(fetchCompanyInvites.fulfilled, (state, action) => {
        state.companyInvites = action.payload;
      })
      .addCase(fetchCompanyInvites.rejected, (state, action) => {
        state.companyInvitesError = action.payload as string;
      })

      .addCase(fetchCompanyRequests.pending, (state) => {
        state.companyRequests = [];
        state.companyRequestsError = "";
      })
      .addCase(fetchCompanyRequests.fulfilled, (state, action) => {
        state.companyRequests = action.payload;
      })
      .addCase(fetchCompanyRequests.rejected, (state, action) => {
        state.companyRequestsError = action.payload as string;
      })

      .addCase(fetchCompanyBlockedList.pending, (state) => {
        state.companyBlockedList = [];
        state.companyBlockedListError = "";
      })
      .addCase(fetchCompanyBlockedList.fulfilled, (state, action) => {
        state.companyBlockedList = action.payload;
      })
      .addCase(fetchCompanyBlockedList.rejected, (state, action) => {
        state.companyBlockedListError = action.payload as string;
      });
  },
});

export const { clearCompanyState } = companyByIdSlice.actions;
export default companyByIdSlice.reducer;
