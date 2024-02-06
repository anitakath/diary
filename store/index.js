import { configureStore } from "@reduxjs/toolkit";

//SLICES
import filterReducer from "./filterSlice";
import authReducer from "./authSlice";
import counterSlice from "./counterSlice";
import toggleReducer from "./toggleSlice";
import userReducer from './userSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    filter: filterReducer,
    counter: counterSlice,
    toggle: toggleReducer,
    user: userReducer

  },
});

export default store;
