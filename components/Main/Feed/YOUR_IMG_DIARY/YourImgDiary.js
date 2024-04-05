
import { useState, useEffect, useContext } from 'react';
import styles from './YourImgDiary.module.css'

import { supabase } from '@/services/supabaseClient';

import { RedditContext } from '@/context/RedditContext';
import { setUser } from '@/store/userSlice';

//REDUX
import { useDispatch, useSelector } from "react-redux";

import Link from 'next/link';







const YourImgDiary = () =>{


    const { currentGoogleUser } = useContext(RedditContext);
    const nightMode = useSelector((state) => state.toggle.isNightMode);

    const [style, setStyle] = useState(false);

    useEffect(() => {
        setStyle(nightMode);
    }, [nightMode]);




    const [images, setImages] = useState([]);
    const [imagesLoaded, setImagesLoaded] = useState(false)

    const [userId, setUserId] = useState('')

    useEffect(()=>{
        if(currentGoogleUser){
            setUserId(currentGoogleUser.user.id)
        }
    }, [])

   

    useEffect(() =>{


        const fetchImages = async() =>{
            const { data, error } = await supabase
                .from("users_images")
                .select("*")
                .order("id", { ascending: false });

            if(data){
    
                setImages(data)
                setImagesLoaded(true)
            } else{
                console.log(error)
            }

        }

        fetchImages()




       }, [userId])


 

       const deletePostHandler = async(postId) =>{
         try {
           const { data, error } = await supabase
             .from("users_images")
             .delete()
             .eq("id", postId);

           if (error) {
             console.error(error);
           } else {
             console.log("Post deleted successfully");
             // Hier können Sie die Liste der Bilder aktualisieren, um das gelöschte Bild zu entfernen
             setImages(images.filter((image) => image.id !== postId));
           }
         } catch (error) {
           console.error(error);
         }
       }



    return (
      <div className={styles.container}>
        <Link
          href="/dein-bildertagebuch"
          className={style ? styles.link_darkmode_first : styles.link_first}
        >
          Tagebuch-Übersicht
        </Link>
        {imagesLoaded &&
          images.map((image) => (
            <div className={styles.diarypost_div} key={image.id}>
              <div className={styles.options_div}>
                <Link
                  className={style ? styles.link_darkmode : styles.link}
                  href={`/dein-bildertagebuch/${image.name.replace(
                    /\s+/g,
                    "-"
                  )}`}
                >
                  Eintrag einsehen
                </Link>

                <button
                  className={styles.delete_btn}
                  onClick={() => deletePostHandler(image.id)}
                >
                  Eintrag löschen
                </button>
              </div>
              <img src={image.url} key={image.id} className={styles.img}></img>
            </div>
          ))}
      </div>
    );
}


export default YourImgDiary