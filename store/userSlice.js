import { createSlice } from "@reduxjs/toolkit";
import { supabase } from "@/services/supabaseClient";
const userSlice = createSlice({
  name: "user",
  initialState: {
    currentGoogleUser: null,
  },
  reducers: {
    setCurrentGoogleUser(state, action) {
      state.currentGoogleUser = action.payload;
    },
  },
});

export const { setCurrentGoogleUser } = userSlice.actions;
export default userSlice.reducer;

// Füge die Logik aus dem useEffect in eine separate Funktion ein, die den aktuellen Google-Benutzer setzt
export const fetchCurrentGoogleUser = () => async (dispatch) => {
  const { user } = supabase.auth.getSession() || { user: null };
  dispatch(setCurrentGoogleUser(user));

  supabase.auth.onAuthStateChange((_event, authSession) => {
    dispatch(setCurrentGoogleUser(authSession));
  });
};

