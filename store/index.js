import { configureStore } from "@reduxjs/toolkit";

//SLICES
import filterReducer from "./filterSlice";
import authReducer from "./authSlice";
import counterSlice from "./counterSlice";
import toggleReducer from "./toggleSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    filter: filterReducer,
    counter: counterSlice,
    toggle: toggleReducer
  },
});

export default store;
