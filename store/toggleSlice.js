import { createSlice } from "@reduxjs/toolkit";


let initialState = {
  isNightMode: false,
};



if (typeof window !== "undefined") {
  const isNightModeInLocalStorage = localStorage.getItem("isNightMode");
  initialState = {
    isNightMode: isNightModeInLocalStorage
      ? JSON.parse(isNightModeInLocalStorage)
      : false,
  };
}


const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    toggle: (state) => {
      
       return {
         ...state,
         isNightMode: !state.isNightMode,
       };
    },
  },
});


export default toggleSlice.reducer;
export const {toggle} = toggleSlice.actions;