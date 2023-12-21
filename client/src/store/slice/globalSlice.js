import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
  name: "global",
  initialState: {
    isOpen: false,
  },
  reducers: {
    isOpenModal: (state, action) => {
      return {
        ...state,
        isOpen: true,
      };
    },
    isCloseModal: (state, action) => {
      return {
        ...state,
        isOpen: false,
      };
    },
  },
});
export const { isOpenModal, isCloseModal } = globalSlice.actions;
export default globalSlice.reducer;
