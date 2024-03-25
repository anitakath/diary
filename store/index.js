import { configureStore } from "@reduxjs/toolkit";

//SLICES
import filterReducer from "./filterSlice";
import authReducer from "./authSlice";
import counterSlice from "./counterSlice";
import toggleReducer from "./toggleSlice";
import userReducer from './userSlice'
import postReducer from './postSlice'
import imagesReducer from './supabaseImagesSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    filter: filterReducer,
    counter: counterSlice,
    toggle: toggleReducer,
    user: userReducer,
    post: postReducer,
    images: imagesReducer

  },
});

export default store;
