
import { useEffect, useState, useContext } from "react";


//COMPONENTS
import Main from '@/components/Main/Main';

//CONTEXT
import { RedditContext } from "@/context/RedditContext";


//REDUX
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/store/authSlice";

//HOOKS
import useSWR from 'swr'

import { supabase } from "@/services/supabaseClient";
import { current } from "@reduxjs/toolkit";

  //fetchet hits the endpoint (api/get-posts) and retrieves its result as json. result is named data
//const fetcher = (...args) => fetch(...args).then((res) => res.json());


export default function Home() {

  const {currentGoogleUser, fetcher} = useContext(RedditContext)


  const dispatch = useDispatch();


  const [myPosts, setMyPosts] = useState();

  const { data, error } = useSWR("/api/get-post", fetcher, {
    refreshInterval: 200,
  });

 
  useEffect(()=>{

    if (currentGoogleUser) {
      dispatch(login());
    }
  }, [currentGoogleUser])

 

  const saveAndUpdateUser = async () =>{
    if (!currentGoogleUser) return;

   

    
    // Überprüfe, ob der Benutzer bereits in der Datenbank existiert
    const { data: existingUserData } = await supabase
      .from("users")
      .select("*")
      .eq("email", currentGoogleUser.user.identities[0].identity_data.email);

    if (existingUserData.length > 0) {

      console.log(" if => user exists @ supabase users ");
      // Der Benutzer existiert bereits - führe ein Update durch
      await supabase
        .from("users")
        .update({
          name: currentGoogleUser.user.identities[0].identity_data.name,
          profileImage: currentGoogleUser.user.identities[0].identity_data.picture,
        })
        .eq("email", currentGoogleUser.user.identities[0].identity_data.email);
    } else {
      console.log(" else => user did not exist @ supabase users ");
      // Der Benutzer existiert noch nicht - füge ihn hinzu
      await supabase.from("users").upsert({
        email: currentGoogleUser.user.identities[0].identity_data.email,
        name: currentGoogleUser.user.identities[0].identity_data.name,
        profileImage: currentGoogleUser.user.identities[0].identity_data.picture,
      });
    }

   

    const { data } = await supabase
      .from("users") // der erstellte table auf supabase.com...
      .select("*");

  
  }

  useEffect(() =>{
    if (!data) return
    setMyPosts(data.data)
  }, [data])

  useEffect(()=>{
    saveAndUpdateUser()
    //console.log('Save user')
  }, [])
  


  

  useEffect(() => {
    if (error) {
      console.error("Error fetching data:", error);
    }
    if (data && data.data.length > 0) {
      setMyPosts(data);
    }
  }, [data, error]);

  useEffect(()=>{
    if(!data) return

    setMyPosts(data.data)
  }, [data])



  return (
  
    <div className="App">
     
      <Main posts={myPosts} />
    </div>

  );
          
       
}
