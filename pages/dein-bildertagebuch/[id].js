import { useState } from "react";
import { useRouter } from "next/router"

import { supabase } from "@/services/supabaseClient";
import { useEffect } from "react";
import { current } from "@reduxjs/toolkit";


import styles from './Id.module.css'

export async function getServerSideProps(context) {
  const postId = context.params.id; // Extrahiere die Post-ID aus dem Pfadparameter


  

  // Rufe Daten aus beiden Tabellen ab und filtere nach der Post-ID
  /*const { data } = await supabase
    .from("users_images")
    .select("*")
    //.eq("pathId", postId)
    .single();
  
    console.log(data)*/

     const { data, error } = await supabase
       .from("users_images")
       .select("*")
       //.eq("name", id)
       .order("id", { ascending: false });

     if (data) {
       console.log(data);

     } else {
       console.log(error);
     }

    const post = data;
  // Überprüfe, ob der Post in einer der Tabellen gefunden wurde

  return {
    props: {
      post,
      
    },
  };
}


const YourImgDiary = ({post}) =>{


    const router = useRouter();
    const { id } = router.query;

    const [currentPost, setCurrentPost] = useState([])
    const [postLoaded, setPostLoaded] = useState(false)

    console.log(id);

    console.log(post)

    useEffect(()=>{

        const filteredObject = post.find((p) => p.name === id)

        console.log(filteredObject)
        setCurrentPost(filteredObject)
        setPostLoaded(true);

    }, [post])

    console.log(currentPost)
    console.log(id)
    console.log(postLoaded)

   return (
     <div>
       {postLoaded && currentPost && (
         <div className={styles.diarypost_div}>
           <h1> Eintrag: </h1>
           <img
             src={currentPost.url}
             key={currentPost.id}
             className={styles.img}
           ></img>
         </div>
       )}
     </div>
   );
}

export default YourImgDiary