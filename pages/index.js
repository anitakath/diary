
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

//STYLES
import styles from '../styles/Index.module.css'

//HOOKS
import { usePosts } from "@/hooks/usePosts";
import { useUser } from "@/hooks/useUser";
import { useNightMode } from "@/hooks/usenightMode";



export default function Home() {
 
 

 const { myPosts, addNewPost } = usePosts();
 const { currentGoogleUser, saveAndUpdateUser } = useUser();
 const { style } = useNightMode();


  let googleUserId;

  if (currentGoogleUser) {
    googleUserId = currentGoogleUser.user.id;
  }

  return (
    <div className={style ? styles.main_container : styles.main_container_light}>
      <Main
        addNewPost={addNewPost}
        posts={myPosts}
        currentGoogleUserId={googleUserId}
        nightMode={style}
      />
    </div>
  );
}
