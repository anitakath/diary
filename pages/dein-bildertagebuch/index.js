

import { useEffect, useState } from "react";
import { supabase } from "@/services/supabaseClient";
import Link from "next/link";
//REDUX
import { useSelector } from "react-redux";
import styles from './Index.module.css'

//CUSTOM HOOKS
import useFormatDate from "@/components/custom_hooks/useFormatDate";
import { useUser } from "@/hooks/useUser";


const YourLibrary = () =>{

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const { currentGoogleUser } = useUser()
  const { formatDate1 } = useFormatDate();

  const [userId, setUserId] = useState(false);
  const CDN_URL = process.env.CDN_URL;
  const CDN_URL_USERID = `${CDN_URL}${userId}`;

  const nightMode = useSelector((state) => state.toggle.isNightMode);
  const [style, setStyle] = useState(false);


  const [images, setImages] = useState([]);
  const [loadedImages, setLoadedImages] = useState(false);
  const [active, setActive] = useState('neueste')

  const [loading, setLoading] = useState(false)


  // ------------------  NIGHT / DAY MODE TOGGLE ----------------------

  useEffect(() => {
    setStyle(nightMode);
  }, [nightMode]);
 

  //supabase storage:
  const fetchImages = async () => {
    setLoading(true)
    try {
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

        if (data && data.length > 0) {

          image_info.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          setImages(image_info);

          if (images) {
            setLoading(false)
            setLoadedImages(true);
          }
        } else {
          setLoading(false)
          console.log(error);
        }
       } catch (error) {
         setLoading(false)
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





 useEffect(() => {
   if (active === "älteste") {
     setLoading(true)
     console.log('älteste aktiv')
     const sortedOldestImages = [...images].sort((a, b) => {
       const dateA = new Date(a.created_at);
       const dateB = new Date(b.created_at);
       return dateA - dateB; // Sortiere aufsteigend nach Datum
     });
     setImages(sortedOldestImages);
      setLoading(false);
   } else if (active === "neueste") {
     setLoading(true)
     console.log("neueste aktivvv");
     const sortedNewestImages = [...images].sort((a, b) => {
       const dateA = new Date(a.created_at);
       const dateB = new Date(b.created_at);
       setLoading(false)
       return dateB - dateA; // Sortiere absteigend nach Datum
     });
     setImages(sortedNewestImages);
   }
 }, [active]);

const setBtnHandler = (e) => {
  setActive(e);
};




  return (
    <div className={style ? styles.wrapper_dark : styles.wrapper}>
      <div className={styles.title_div}>
        <h1 className={style ? styles.title_dark : styles.title}>
          deine Einträge
        </h1>
      </div>

      <div className={styles.sort_btns_div}>
        <button
          className={`${styles.btn} ${
            active === "älteste" ? styles.active : ""
          }`}
          onClick={() => setBtnHandler("älteste")}
        >
          älteste
        </button>
        <buton
          className={`${styles.btn} ${
            active === "neueste" ? styles.active : ""
          }`}
          onClick={() => setBtnHandler("neueste")}
        >
          neueste
        </buton>
      </div>
      {loading && <div className={styles.loading_div}> <h1> deine Einträge werden geladen 🫶🏼 </h1> </div>}
      <div className={style ? styles.container_dark : styles.container}>
        {images
          .filter((image) => image.name !== ".emptyFolderPlaceholder")
          .map((image) => (
            <div className={styles.image_div} key={image.id}>
              <Link
                href={`/dein-bildertagebuch/${image.name.replace(/\s+/g, "-")}`}
              >
                <img
                  key={image.id}
                  src={image.url}
                  alt="gallery-image"
                  className={styles.img}
                />
              </Link>
              <p className={styles.description}>
                {formatDate1(image.created_at)}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default YourLibrary;