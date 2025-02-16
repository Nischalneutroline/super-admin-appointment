import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import authServices from "../../services/auth/authService";

export const registerSuperAdmin = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authServices.registerSuperAdminService(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for logging in Super Admin
export const loginSuperAdmin = createAsyncThunk(
  "auth/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await authServices.loginSuperAdminService(loginData);
      console.log("The resppone is", response)
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  success: false,
  error: null,
};

const handlePending = (state) => {
  state.loading = true;
  state.success = false;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.success = false;
  state.error = action.payload || "An error occured.";
};

// Slice for authentication
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetState: (state) => {
      state.user = null;
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerSuperAdmin.pending, handlePending)
      .addCase(registerSuperAdmin.rejected, handleRejected)
      .addCase(registerSuperAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
        state.error = null;
      })
      // Handle login actions
      .addCase(loginSuperAdmin.pending, handlePending)
      .addCase(loginSuperAdmin.rejected, handleRejected)
      .addCase(loginSuperAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.data.superAdmin;
        state.error = null;
      });
  },
});

export const { resetState } = authSlice.actions;
export default authSlice.reducer;
