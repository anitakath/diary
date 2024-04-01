import { useState } from "react";
import { useRouter } from "next/router"

import { supabase } from "@/services/supabaseClient";
import { useEffect } from "react";
import { current } from "@reduxjs/toolkit";

import Link from "next/link";

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
    const [notFound, setNotFound] = useState(false);

    console.log(id);

    console.log(post)

    useEffect(()=>{
      const filteredObject = post.find((p) => p.name === id)

       const formattedId = id.replace(/-/g, " "); // Ersetze Bindestriche durch Leerzeichen
       const secondFilteredObject = post.find((p) => p.name === formattedId);

       if (filteredObject === undefined && secondFilteredObject === undefined) {
          setNotFound(true);
       } else if (filteredObject === undefined) {
         setCurrentPost(secondFilteredObject);
       } else if (secondFilteredObject === undefined) {
         setCurrentPost(filteredObject);
       } else {
         setCurrentPost(filteredObject);
       }

      console.log(filteredObject)
      console.log(secondFilteredObject)


        console.log(filteredObject)
        //setCurrentPost(filteredObject)
        setPostLoaded(true);

    }, [post])

    console.log(currentPost)
    console.log(id)
    console.log(postLoaded)
    console.log(notFound)

   return (
     <div className={styles.container}>
       {notFound && (
         <div className={styles.fourOfour_div}>
           <p className={styles.notFound_p}> Eintrag nicht gefunden </p>
           <Link href="/" className={styles.goBack_link}> gehe zurück</Link>
         </div>
       )}
       {!notFound && postLoaded && currentPost && (
         <div className={styles.diarypost_div}>
           <h1> Eintrag: </h1>
           <div className={styles.info_div}>
             <img
               src={currentPost.url}
               key={currentPost.id}
               className={styles.img}
             ></img>
             <div className={styles.text_div}>
               <h1 className={styles.title}> {currentPost.name}</h1>
               <p className={styles.description}> {currentPost.description}</p>
             </div>
           </div>
         </div>
       )}
     </div>
   );
}

export default YourImgDiary