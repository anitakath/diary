

import { useEffect, useState, useContext } from "react";
import { supabase } from "@/services/supabaseClient";
import { RedditContext } from "@/context/RedditContext";
import Link from "next/link";


//REDUX
import { useDispatch, useSelector } from "react-redux";
import { setImages } from "@/store/supabaseImagesSlice";

import { useRouter } from "next/router";

import styles from './Index.module.css'

//CUSTOM HOOKS
import useFormatDate from "@/components/custom_hooks/useFormatDate";


const YourLibrary = () =>{
  const router = useRouter();
  const { currentGoogleUser } = useContext(RedditContext);
  const [userId, setUserId] = useState(false);
  const CDN_URL = process.env.CDN_URL;
  const CDN_URL_USERID = `${CDN_URL}${userId}`;

  const nightMode = useSelector((state) => state.toggle.isNightMode);
  const [style, setStyle] = useState(false);


  const [images, setImages] = useState([]);
  const [loadedImages, setLoadedImages] = useState(false);


  // ------------------  NIGHT / DAY MODE TOGGLE ----------------------

  useEffect(() => {
    setStyle(nightMode);
  }, [nightMode]);



  const formatDate = useFormatDate();


 

     const fetchImages = async () => {
       try {
         // Fetchen der Bilder aus dem Supabase Storage
         const { data, error } = await supabase.storage
           .from("images")
           .list(userId + "/users/", {
             limit: 100,
             offset: 0,
             sortBy: { column: "name", order: "asc" },
           });

           const { data: image_info } = await supabase
             .from("users_images")
             .select("*");


             console.log(image_info)

         if (data) {
           setImages(image_info);
           console.log(data);
           console.log(images);

           if (images) {
             console.log("there are images");
             setLoadedImages(true);
           }

           //await uploadDescription();
         } else {
           console.log(error);
         }
       } catch (error) {
         console.error(error);
         setLoadedImages(false);
       }
     };

  

    useEffect(() => {
        if (currentGoogleUser) {
            setUserId(currentGoogleUser.user.id);
            fetchImages();
        }
    }, [currentGoogleUser]);

    console.log(images);




  return (
    <div className={style ? styles.container_dark : styles.container}>
      {images
        .filter((image) => image.name !== ".emptyFolderPlaceholder")
        .map((image) => (
          <div className={styles.wrapper}>
            <Link href={`/dein-bildertagebuch/${image.name.replace(
                    /\s+/g,
                    "-"
                  )}`}>
              <img
                key={image.id}
                src={image.url}
                alt="gallery-image"
                className={styles.img}
              />
            </Link>
            <p className={styles.description}>{formatDate(image.created_at)}</p>
          </div>
        ))}
    </div>
  );
}

export default YourLibrary;