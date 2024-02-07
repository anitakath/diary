import { supabase } from "@/services/supabaseClient";



// -------- FOR GOOGLE AUTH!!!!!


import { createContext, useState, useEffect } from "react";

export const RedditContext = createContext();

export const RedditProvider = ({children}) => {
  const [currentGoogleUser, setCurrentGoogleUser] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null)
  //fetchet hits the endpoint (api/get-posts) and retrieves its result as json. result is named data
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  useEffect(() => {
    const { user } = supabase.auth.getSession() || { user: null };

    setCurrentGoogleUser(user);

    //console.log({user}, 'HIIIII :>')

    supabase.auth.onAuthStateChange((_event, authSession) => {
      setCurrentGoogleUser(authSession);
    });
  }, []);

  console.log(currentGoogleUser);

  return (
    <RedditContext.Provider
      value={{ currentGoogleUser, fetcher, selectedPost, setSelectedPost }}
    >
      {children}
    </RedditContext.Provider>
  );
}