import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser } from "./asyncAction";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthLogin: false,
    current: null,
    accessToken: null,
    isLoading: false,
    message: "",
  },
  reducers: {
    login: (state, action) => {
      state.isAuthLogin = action.payload.isAuthLogin;
      state.accessToken = action.payload.accessToken;
    },
    logout: (state, action) => {
      state.isAuthLogin = false;
      state.accessToken = null;
      state.current = null;
      state.isAuthLogin = false;
      state.message = "";
    },
    clearMessage: (state) => {
      state.message = "";
    },
    updateCart : (state , action) => {

    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.current = action.payload;
    });
    builder.addCase(getCurrentUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthLogin = false;
      state.message = "Phiên đăng nhập đã hết hạn ";
      state.accessToken = null;
      state.current = null;
    });
  },
});
export const { login, logout, clearMessage } = authSlice.actions;
export default authSlice.reducer;
