import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetCurrentUser } from "apis/user";

export const getCurrentUser = createAsyncThunk(
  "/auth/current",
  async (data, { rejectWithValue }) => {
    const response = await apiGetCurrentUser();
    if (!response.success) return;
    return response.data;
  }
);
