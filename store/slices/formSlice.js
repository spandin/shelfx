import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    selectType: "fullDate",
    shelfTime: 0,
  },
  reducers: {
    setSelectType: (state, action) => {
      state.selectType = action.payload;
    },
    setShelfTime: (state, action) => {
      state.shelfTime = action.payload;
    },
  },
});

export const { setSelectType, setShelfTime } = formSlice.actions;

export default formSlice.reducer;
