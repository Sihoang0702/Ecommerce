import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "apis";

export const getCategory = createAsyncThunk(
  "/app/categories",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiGetCategory();
    if (!response) rejectWithValue(response);
    return response.data;
  }
);
