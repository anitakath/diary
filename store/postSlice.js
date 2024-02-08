// postSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    selectedPost: null,
  },
  reducers: {
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
  },
});

export const { setSelectedPost } = postSlice.actions;

export const dispatchSelectedPost = (selectedPost) => (dispatch) => {
  dispatch(setSelectedPost(selectedPost));
};

export default postSlice.reducer;
