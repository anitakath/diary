import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  images: [],
};

const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    setSupebaseImages(state, action) {
      state.images = action.payload;
      console.log(state)
      console.log(action)
    },
  },
});

export const { setSupebaseImages } = imagesSlice.actions;

export default imagesSlice.reducer;
