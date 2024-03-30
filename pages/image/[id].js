import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./ImageDetails.module.css";


//REDUX 
import { useSelector, useDispatch } from "react-redux";
import { supabase } from '@/services/supabaseClient';
import { setSupebaseImages } from '@/store/supabaseImagesSlice';
import { current } from "@reduxjs/toolkit";



//CONTEXT
import { RedditContext } from "@/context/RedditContext";
import { useContext} from "react";




export async function getServerSideProps(context) {
  const imageId = context.params.id; // Extrahiere die Bild-ID aus dem Pfadparameter
  
   
  // Rufe Daten aus der Tabelle "images_informations" ab und filtere nach der Bild-ID
  const { data: imageData } = await supabase
    .from("image_informations")
    .select("*")
    .eq("imageId", imageId)
    .single();



  

  // Überprüfe, ob das Bild in der Tabelle gefunden wurde
  return {
    props: {
      imageData,

    },
  };
}



const ImageDetails = ({imageData, imageFile}) => {
  const router = useRouter();
  const { id } = router.query;
  const { currentGoogleUser, fetcher } = useContext(RedditContext);





  const supabaseImages = useSelector((state) => state.images.images);

  const nightMode = useSelector((state) => state.toggle.isNightMode);
  const [style, setStyle] = useState(false);
  const  [selectedImage, setSelectedImage] = useState()
  const [ userId, setUserId] = useState()
  const [images, setImages] = useState([])
  const [imageLoaded, setImageLoaded] = useState(false)
  const [description, setDescription] = useState("")
  const [isLoaded, setIsLoaded] = useState(null);
 
  const CDN_URL = process.env.CDN_URL;
  const CDN_URL_USERID = `${CDN_URL}${userId}/`;
 


  useEffect(()=>{

    const fetchImage = async () =>{
      const { data, error } = await supabase.storage
        .from("images")
        .list(userId + "/", {
          limit: 100,
          offset: 0,
          sortBy: { column: "name", order: "asc" },
        });

    }





    if(imageData){
   
     
      if(currentGoogleUser){
        setUserId(currentGoogleUser.user.id);
      }

      fetchImage();
      
    } else{
      console.log('could not find any imageDate at supabase bucket images for images/id')
    }
 

  }, [imageData, currentGoogleUser])







  useEffect(() => {
    if (imageData) {
      setIsLoaded(true);
    }
  }, [imageData]);





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


  
  useEffect(() => {

    if(currentGoogleUser){
        setUserId(currentGoogleUser.user.id)
        setImageLoaded(true)
        filterImage()
    }

  }, [userId]);





  return (
    <div className={style ? styles.container_dark : styles.container}>
      <div className={styles.image_wrapper}>
        <div className={styles.image_div}>
          {imageLoaded && (
            <img className={styles.image} src={CDN_URL_USERID + "/" + id} />
          )}
        </div>
      </div>

      <div className={styles.info_div}>

        <div className={styles.title_div}>
          <h1 className={styles.title}> 20. Januar, 202</h1>
          <div className={styles.mobile_image_div}>
            {imageLoaded && (
              <img
                className={styles.image_mobile}
                src={CDN_URL_USERID + "/" + id}
              />
            )}
          </div>
        </div>
        <div className={styles.description_div}>
          <p className={style ? styles.info : styles.info_light}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageDetails;
