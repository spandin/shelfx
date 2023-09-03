import { createSlice } from '@reduxjs/toolkit';

const getTheme = () => {
  const theme = 'light';

  return theme;
};

const initialState = getTheme();

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => action.payload,
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
