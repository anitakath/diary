import { createSlice } from "@reduxjs/toolkit";



const toggleSlice = createSlice({
  name: "toggle",
  initialState: {
    isNightMode: false,
  },
  reducers: {
    toggle: (state) => {

      //console.log(state.isNightMode)
      //return !state; // Kürzere und korrekte Art, den Zustand umzuschalten
       return {
         ...state,
         isNightMode: !state.isNightMode,
       };
    },
  },
});


export default toggleSlice.reducer;
export const {toggle} = toggleSlice.actions;