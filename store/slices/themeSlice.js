import { createSlice } from '@reduxjs/toolkit';

const getTheme = () => {
  const theme = `${window?.localStorage?.getItem('theme')}`;
  if (['light', 'dark'].includes(theme)) return theme;

  const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
  if (userMedia.matches) return 'dark';

  return 'light';
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
