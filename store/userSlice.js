import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {},
    reducers: {
        setUser(state, action) {
          return { ...state, ...action.payload }; // Erstelle eine neue Kopie des Zustands und füge die neuen Daten hinzu
        }
    }
})
export const { setUser } = userSlice.actions;
export default userSlice.reducer;