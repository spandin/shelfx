import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    category: "Все",
    isExported: "exported",
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setExported: (state, action) => {
      state.isExported = action.payload;
    },
  },
});

export const { setCategory, setExported } = filterSlice.actions;

export default filterSlice.reducer;
