

import { createSlice } from "@reduxjs/toolkit";


const initialFilterState = typeof window !== 'undefined' ? localStorage.getItem("selectedFilter") || "beste" : "beste";



const filterSlice = createSlice({
  name: "filter",
  initialState: {
    selectedFilter: initialFilterState,
    bestIsActive: true,
    hotIsActive: false,
    newIsActive: false,
    topIsActive: false,
    deineIsActive: false

  },
  reducers: {
    filter: (state, action) => {
     
      state = action.payload;
      localStorage.setItem("selectedFilter", action.payload)
      return state;
    },
    setActButton: (state, action) => {
      if(action.payload === "beste"){

        
        return {
          bestIsActive: true,
          hotIsActive: false,
          newIsActive: false,
          topIsActive: false,
          deineIsActive: false
        };
      }else if (action.payload === "heiß"){
        return {
          bestIsActive: false,
          hotIsActive: true,
          newIsActive: false,
          topIsActive: false,
          deineIsActive: false
        };
      } else if (action.payload === "neu"){
        return {
          bestIsActive: false,
          hotIsActive: false,
          newIsActive: true,
          topIsActive: false,
          deineIsActive: false
        };
      } else if (action.payload === "top"){
        return {
          bestIsActive: false,
          hotIsActive:false,
          newIsActive:false,
          topIsActive:true,
          deineIsActive:false
        };
        } else if (action.payload === "deine"){
        return {
          bestIsActive:false,
          hotIsActive:false,
          newIsActive:false,
          topIsActive:false,
         deineIsActive:true
       };
     }


     console.log(state)
     return state;
   }
    

    

    

      
  },
});

export default filterSlice.reducer;
export const { filter, setActButton } = filterSlice.actions;
