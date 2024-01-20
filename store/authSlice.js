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
      
    },
    logout(state) {
      state.isLoggedIn = false;
    },
    gender(state, action){
      state.gender = action.payload;
    }
  },
});

export const { login, logout, gender } = authSlice.actions;
export default authSlice.reducer;
