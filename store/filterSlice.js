import { createSlice } from "@reduxjs/toolkit";



const filterSlice = createSlice({
  name: "filter",
  initialState: {
    selectedFilter: "deine_posts",
    selectedGroup:"private",
    deinePostsIsActive: true,
    annesImagesIsActive: false,
    deineImagesIsActive: false,
    annesPostsIsActive: false
  },
  reducers: {
    setGroup: (state, action) =>{
      state.selectedGroup = action.payload;
      return state;
    },
    filter: (state, action) => {
      state.selectedFilter  = action.payload;
      return state;
    },
    setActButton: (state, action) => {
      if(action.payload === "beste"){

        
        return {
          ...state,
          deinePostsIsActive: true,
          annesImagesIsActive: false,
          deineImagesIsActive: false,
          annesPostsIsActive: false,
        };
      }else if (action.payload === "heiß"){
        return {
          ...state,
          deinePostsIsActive: false,
          annesImagesIsActive: true,
          deineImagesIsActive: false,
          annesPostsIsActive: false,
        };
      } else if (action.payload === "neu"){
        return {
          ...state,
          deinePostsIsActive: false,
          annesImagesIsActive: false,
          deineImagesIsActive: true,
          annesPostsIsActive: false,
        };
      } else if (action.payload === "top"){
        return {
          ...state,
          deinePostsIsActive: false,
          annesImagesIsActive: false,
          deineImagesIsActive: false,
          annesPostsIsActive: false,
        };
        } else if (action.payload === "deine"){
        return {
          ...state,
          deinePostsIsActive: false,
          annesImagesIsActive: false,
          deineImagesIsActive: false,
          annesPostsIsActive: true,
        };
     }

     return state;
   }
    

      
  },
});

export default filterSlice.reducer;
export const { filter, setActButton, setGroup } = filterSlice.actions;
