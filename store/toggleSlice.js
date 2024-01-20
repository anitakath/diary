import { createSlice } from "@reduxjs/toolkit";



const toggleSlice = createSlice({
  name: "toggle",
  initialState: false,
  reducers: {
    toggle: (state) => !state, // Kürzere und korrekte Art, den Zustand umzuschalten
  },
});


export default toggleSlice.reducer;
export const {toggle} = toggleSlice.actions;