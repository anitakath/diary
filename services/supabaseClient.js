import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";
//import { useDispatch } from "react-redux";
//import {login} from '../store/authSlice'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);


const router = useRouter;


export const signInWithGooogle = async() =>{

  
  let user;


  try{
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "online",
          prompt: "consent",
        },
      },
    });
    user = data; 
   
    if (data) {
      console.log(user, "💜");
      return data;

    }
    if (error) {
      console.error("google sign in error", error);
    }
  
  } catch(error){
    console.error('google sign in error', error)
  }
}


/*
export const signInWithGoogle = async () => {
  const { user, session, error } = await supabase.auth.signIn({
    provider: "google",
  });
  console.log(user);
  console.log(session);
  console.log(error);
  if (error) {
    console.error("Google Sign-In Error", error);
  } else {
    // Manually redirect after successful sign-in
    window.location.href = "/"; // Hier den gewünschten Pfad angeben
  }
};*/
