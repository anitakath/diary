
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




export default function Home() {
  const { currentGoogleUser, fetcher } = useContext(RedditContext);
  const selectedFilter = useSelector((state) => state.filter.selectedFilter);

  console.log(selectedFilter);

  const currUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [myPosts, setMyPosts] = useState(null);
  const nightMode = useSelector((state) => state.toggle.isNightMode);
  const [style, setStyle] = useState(false);
  // ------------------  NIGHT / DAY MODE TOGGLE ----------------------

  useEffect(() => {
    setStyle(nightMode);
  }, [nightMode]);




  const addNewPost = (newPost) => {
    setMyPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const { data, error } = useSWR(
    `/api/get-post?filter=${selectedFilter}`,
    fetcher,
    {
      refreshInterval: 200,
      dedupingInterval: 10000, // Set a deduping interval to prevent refetching on quick filter changes
      revalidateOnFocus: false, // Disable revalidation on focus to prevent refetching when tab is focused
    }
  );

  

  useEffect(() => {
    if (currentGoogleUser) {
      dispatch(login());
    }
  }, [currentGoogleUser]);
  

  useEffect(() => {
    if (data /*&& data.data && !myPosts*/) {
      setMyPosts(data.data);
    }
  }, [data, myPosts]);

  useEffect(() => {
    if (data) {
      setMyPosts(data.data);
    }
  }, [selectedFilter]);

  const saveAndUpdateUser = async () => {
    if (Object.keys(currUser).length === 0) {
      console.log("currUser is empty (login/registration)");
      return;
    } else if (Object.keys(currUser).length != 0) {
      console.log("logic to update...and save ...");
    } else if (!currentGoogleUser) {
      return;
    } else if (currentGoogleUser) {



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
            profileImage:
              currentGoogleUser.user.identities[0].identity_data.picture,
          })
          .eq(
            "email",
            currentGoogleUser.user.identities[0].identity_data.email
          );
      } else {
        //console.log(" else => user did not exist @ supabase users ");
        // Der Benutzer existiert noch nicht - füge ihn hinzu
        await supabase.from("users").upsert(
          {
            email: currentGoogleUser.user.identities[0].identity_data.email,
            name: currentGoogleUser.user.identities[0].identity_data.name,
            profileImage:
              currentGoogleUser.user.identities[0].identity_data.picture,
          },
          {
            onConflict: "email",
          }
        );
      }

      const { data } = await supabase
        .from("users") // der erstellte table auf supabase.com...
        .select("*");
    }
  };

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
        nightMode={nightMode}
      />
    </div>
  );
}
