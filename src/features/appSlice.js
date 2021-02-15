import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    user: null,
    selectImage: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    selectImage: (state, action) => {
      state.selectImage = action.payload;
    },
    resetImage: (state) => {
      state.selectImage = null;
    },
  },
});

export const { login, logout, selectImage, resetImage } = appSlice.actions;

export const selecUser = state => state.app.user;

export const selecSelectedImage = state => state.app.selectImage;

export default appSlice.reducer;
