import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { RedditContext } from "@/context/RedditContext";
import styles from "./ImageDetails.module.css";


//REDUX 
import { useSelector, useDispatch } from "react-redux";
import { supabase } from '@/services/supabaseClient';
import { setSupebaseImages } from '@/store/supabaseImagesSlice';
import { current } from "@reduxjs/toolkit";



const ImageDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const { currentGoogleUser, fetcher } = useContext(RedditContext);
  

  const supabaseImages = useSelector((state) => state.images.images);

  //console.log(supabaseImages);

  //console.log(id);

  // Finde das Bild mit der entsprechenden ID
  //const selectedImage = supabaseImages.find((image) => image.id === id);

  //console.log(selectedImage);

   const nightMode = useSelector((state) => state.toggle.isNightMode);
   const [style, setStyle] = useState(false);
   const  [selectedImage, setSelectedImage] = useState()
   const [ userId, setUserId] = useState()
   const [images, setImages] = useState([])
   const [imageLoaded, setImageLoaded] = useState(false)
   const [description, setDescription] = useState("")
 
  const CDN_URL = process.env.CDN_URL;
  const CDN_URL_USERID = `${CDN_URL}${userId}`;



    useEffect(() => {
      setStyle(nightMode);
    }, [nightMode]);


  const filterImage = async() =>{

   const { data, error } = await supabase
     .from("image_informations")
     .select("*")
     .eq("imageId", id) // Filtern nach imageId === id
     .order("id", { ascending: false });

      setDescription(data[0].description)
    
  }


  //console.log(description)

 

  /*
    const fetchImages = async () => {
      const { data, error } = await supabase.storage
        .from("images")
        .list(userId + "/", {
          limit: 100,
          offset: 0,
          sortBy: { column: "name", order: "asc" },
        });

      if (data) {
        setImages(data);
        console.log(data);
        console.log("DATTAAA");
        // Finde das Bild mit der entsprechenden ID

        const image = data.find((image) => image.id === userId);
        console.log(image);
        setSelectedImage(image);
        setImageLoaded(true);
      } else {
        console.log(error);
      }
    };
  */


    const fetchDescription = () =>{

    }

  
useEffect(() => {

    if(currentGoogleUser){
        setUserId(currentGoogleUser.user.id)
        setImageLoaded(true)
        filterImage()
    }

}, [userId]);

//console.log(selectedImage);
//console.log(userId)
//console.log(CDN_URL_USERID);
//console.log(CDN_URL_USERID + "/" + id);
//console.log(selectedImage);



  return (
    <div className={style ? styles.container_dark : styles.container}>
      <h1> image details</h1>

      <div className={styles.image_wrapper}>
        <div className={styles.image_div}>
          {imageLoaded && (
            <img className={styles.image} src={CDN_URL_USERID + "/" + id} />
          )}
        </div>
        <div className={styles.info_div}>
          <p className={styles.info}>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageDetails;
