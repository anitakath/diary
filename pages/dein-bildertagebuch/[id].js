import { useState, useEffect } from "react";
import { useRouter } from "next/router"

import { supabase } from "@/services/supabaseClient";

import { current } from "@reduxjs/toolkit";

import Link from "next/link";

import styles from './Id.module.css'
import { useSelector } from "react-redux";


//CUSTOM HOOKS
import useFormatDate from "@/components/custom_hooks/useFormatDate";

export async function getServerSideProps(context) {
  const postId = context.params.id; // Extrahiere die Post-ID aus dem Pfadparameter


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


  
  const {formatDate1} = useFormatDate();
  const router = useRouter();
  const { id } = router.query;

    const [currentPost, setCurrentPost] = useState([])
    const [postLoaded, setPostLoaded] = useState(false)
    const [notFound, setNotFound] = useState(false);

    const nightMode = useSelector((state) => state.toggle.isNightMode);
    const [style, setStyle] = useState(false);

    

     useEffect(() => {
       setStyle(nightMode);
     }, [nightMode]);


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


        //setCurrentPost(filteredObject)
        setPostLoaded(true);

    }, [post])

  

   return (
     <div className={style ? styles.container_dark : styles.container}>
       {notFound && (
         <div className={styles.fourOfour_div}>
           <p className={styles.notFound_p}> Eintrag nicht gefunden </p>
           <Link href="/" className={styles.goBack_link}>
             gehe zurück
           </Link>
         </div>
       )}

       {!notFound && postLoaded && currentPost && (
         <div className={styles.diarypost_div}>
           <div className={styles.info_div}>
             <img
               src={currentPost.url}
               key={currentPost.id}
               className={styles.img}
             ></img>
             <div className={styles.text_div}>
               <Link href="/dein-bildertagebuch" className={styles.backToOverview}> zurück zur Übersicht </Link>
               <div className={styles.title_div}>
                 <h1 className={style ? styles.title_dark : styles.title}>
                   {currentPost.name}
                 </h1>
                 <p className={styles.data}>
                   {formatDate1(currentPost.created_at)}
                 </p>
               </div>

               <p
                 className={
                   style ? styles.description_dark : styles.description
                 }
               >
                 {currentPost.description}
               </p>
             </div>
           </div>
         </div>
       )}
     </div>
   );
}

export default YourImgDiary