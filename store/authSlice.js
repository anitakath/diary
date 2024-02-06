import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    gender: 'Frau',
    isRegistered: false,

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
    },
    registration(state, action){
      state.isRegistered = true;
    },
    delete_account(state, action){
      state.isRegistered = false;
    }
  },
});

export const { login, logout, gender, registration, delete_account } = authSlice.actions;
export default authSlice.reducer;
