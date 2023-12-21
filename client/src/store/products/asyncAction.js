import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetProducts } from "apis/product";

export const getProducts = createAsyncThunk(
  "/products/newProducts",
  async (data, { rejectWithValue }) => {
    const response = await apiGetProducts({ sort: "-createdAt" });
    if (!response.success) return;
    return response.data;
  }
);
