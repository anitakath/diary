import { supabase } from "@/services/supabaseClient";



import { createContext, useState, useEffect } from "react";

export const RedditContext = createContext();

export const RedditProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);

  //fetchet hits the endpoint (api/get-posts) and retrieves its result as json. result is named data
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  useEffect(() => {
    const { user } = supabase.auth.getSession() || { user: null };

    setCurrentUser(user);

    //console.log({user}, 'HIIIII :>')

    supabase.auth.onAuthStateChange((_event, authSession) => {
      setCurrentUser(authSession);
    });
  }, []);

  //console.log(currentUser);

  return (
    <RedditContext.Provider value={{ currentUser , fetcher}}>
      {children}
    </RedditContext.Provider>
  );
}