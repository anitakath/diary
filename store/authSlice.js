import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    gender: 'Frau',
  },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
      console.log(state.isLoggedIn);
    },
    logout(state) {
      state.isLoggedIn = false;
      console.log(state.isLoggedIn);
    },
    gender(state, action){
      state.gender = action.payload;
    }
  },
});

export const { login, logout, gender } = authSlice.actions;
export default authSlice.reducer;
