import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "./asyncAction";

const productSlice = createSlice({
  name: "products",
  initialState: {
    newProducts: [],
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.newProducts = action.payload;
    });
    builder.addCase(getProducts, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });
  },
});

export default productSlice.reducer;
