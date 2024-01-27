
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
const fetcher = (...args) => fetch(...args).then((res) => res.json());


export default function Home() {

  const {currentUser} = useContext(RedditContext)
 

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

 
  useEffect(()=>{

    if (currentUser) {
      dispatch(login());
    }
  }, [currentUser])


  

  const [myPosts, setMyPosts] = useState()

  const {data, error} = useSWR('/api/get-post', fetcher, {refreshInterval: 200} )


  

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
