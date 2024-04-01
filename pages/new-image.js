


import { useEffect, useState, useContext } from "react";
import { supabase } from "@/services/supabaseClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { Dropzone } from "react-dropzone";
import { useDropzone } from "react-dropzone";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";

import { RedditContext } from "@/context/RedditContext";

//REDUX
import { useDispatch, useSelector } from "react-redux";
import { setImages } from "@/store/supabaseImagesSlice";



//STYLES
import styles from '../styles/NewImage.module.css'
import { current } from "@reduxjs/toolkit";

import { useRouter } from "next/router";

const NewImage = () =>{

  const router = useRouter()
  const { currentGoogleUser } = useContext(RedditContext);

  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedImages, setLoadedImages] = useState(false);
  const [userId, setUserId] = useState(false)
  const [imageId, setImageId] = useState("");
  //const nightMode = props.nightMode;


    const nightMode = useSelector((state) => state.toggle.isNightMode);

  const [style, setStyle] = useState(false);

  
   useEffect(() => {
    setStyle(nightMode);
  }, [nightMode]);

  console.log(nightMode)

  
  //console.log(nightMode);

  const handleFileUpload = (event) => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
    setImageId(event.target.files[0].name);
  };

  console.log(selectedFile);
  console.log(imageId);
  console.log(images);


 


    useEffect(() => {

        if(currentGoogleUser){
            setUserId(currentGoogleUser.user.id)
        }

    }, [currentGoogleUser]);


    console.log(userId)
  

  
  const CDN_URL = process.env.CDN_URL;
  const CDN_URL_USERID = `${CDN_URL}${userId}`;
  const dispatch = useDispatch();

  const uploadDescription = async () => {
    console.log(userId);
    console.log(images.name);
    console.log(description);
    console.log(imageId);
    try {
      const { data, error } = await supabase.from("image_informations").insert([
        {
          description: description,
        },
      ]);

      if (data) {
        console.log("Description uploaded successfully");
      } else {
        console.log(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchImages = async () => {
    try {
      // Fetchen der Bilder aus dem Supabase Storage
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

  console.log(images);



  const supabaseImages = useSelector((state) => state.images.images);

  const uploadImageHandler = async (event) => {
    event.preventDefault();
    console.log(selectedFile);
    setIsLoading(true);

    try {
      if (selectedFile) {
        // userId/nameOfImg.jpg
        // Upload des ausgewählten Bildes an Supabase Storage

        const { data, error } = await supabase.storage
          .from("images")
          .upload(userId + "/" + uuidv4(), selectedFile); //uuidv4() => string with bunch of chars

        if (data) {
          console.log(data);
          setIsLoading(false);
          //props.closeModal();
          //getImages();
          fetchImages();
          console.log(data.path);
          const path = data.path;
          const parts = path.split("/"); //teilt den String an dem "/"
          const lastPart = parts[parts.length - 1];

          console.log(lastPart);

          // Upload der Beschreibung zusammen mit dem Bild in die Tabelle "image_informations"
          const { descriptionData, descriptionError } = await supabase
            .from("image_informations")
            .insert([
              {
                description: description,
                imageId: lastPart, // Key des hochgeladenen Bildes als Referenz
              },
            ]);
        } else {
          console.log(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log(isLoading);
  console.log(description);










  const [alternativeImages, setAlternativeImages] = useState([]);
  const [chosenAlternativeImage, setChosenAlternativeImage] = useState([])

  useEffect(() => {
    const uploadAlternativeImages = async (event) => {
      try {
        const { data, error } = await supabase.storage
          .from("images")
          .list("4d47a2af-f29f-4530-bec6-0f08c7dd347c/alternatives");

        if (error) {
          console.error("Error listing files:", error.message);
          return;
        } else {
          setAlternativeImages(data);
        }

        console.log(data); // Array mit den Informationen zu den Dateien im Ordner "alternatives"
      } catch (error) {
        console.error("An error occurred:", error.message);
      }
    };

    uploadAlternativeImages();
  }, []);

  

  console.log(alternativeImages);


 const chooseAlternativeImage = (e) => {
   console.log(e.target.value);
   const foundObj = alternativeImages.find((obj) => obj.name === e.target.value)

   console.log(foundObj)
   setChosenAlternativeImage(foundObj)

 };

 const [showAltImg,setShowAltImg] = useState(false)
 const [generatedUrl, setGeneratedUrl] = useState("");


  const uploadAlternativeImage = async (e) =>{
    e.preventDefault()
    console.log('MOINCITO')
    console.log(chosenAlternativeImage)
   if(chosenAlternativeImage){
     setShowAltImg(true);
     const url =
       CDN_URL_USERID + "/alternatives" + "/" + chosenAlternativeImage.name;
     setGeneratedUrl(url);

     console.log(url);

     const data = {
       created_at: chosenAlternativeImage.created_at,
       url: url,
     };

     // Senden des Objekts an die Supabase-Tabelle "users_images"
     const { data: newImage, error } = await supabase
       .from("users_images")
       .insert([data]);

     if (error) {
       console.error(
         "Fehler beim Einfügen des Bildes in die Datenbank:",
         error.message
       );
     } else {
       console.log("Bild erfolgreich in die Datenbank eingefügt:", newImage);
     }
   }
    
  };


  console.log(selectedFile)
  return (
    <div className={style ? styles.container_dark : styles.container}>
      <h1 className={styles.title}> lade ein Foto hoch</h1>

      <form className={styles.form_div}>
        <input
          type="file"
          onChange={handleFileUpload}
          className={styles.file_input}
        />

        <textarea
          className={styles.description}
          placeholder="beschreibe dein Foto hier "
          value={description}
          onChange={(event) => setDescription(event.currentTarget.value)}
        ></textarea>

        <div className={styles.isLoadingInfo_div}>
          {isLoading && <h1> lädt Foto hoch ....</h1>}
        </div>

        <div className={styles.buttons_div}>
          <button className={styles.submit_btn} onClick={uploadImageHandler}>
            hochladen
          </button>
          {/*  <button className={styles.close_btn} onClick={props.closeModal}> */}
          close
        </div>
      </form>

      <h1 className={styles.title}>oder wähle ein von mir gestelltes Foto</h1>

      <form className={styles.form_div} onSubmit={uploadAlternativeImage}>
        <div className={styles.alternative_div}>
          {alternativeImages.map((image) => (
            <div className={styles.alternative_wrapper}>
              <input
                type="radio"
                id={image.name}
                name="alternativeImages"
                value={image.name}
                onChange={chooseAlternativeImage}
                className={styles.alternativeImage_input}
              />
              <img
                key={image.id}
                src={CDN_URL_USERID + "/alternatives/" + image.name}
                alt="gallery-image"
                className={styles.alternativeImg}
              />
            </div>
          ))}
        </div>

        <button type="submit"> senden </button>
      </form>

      {showAltImg && (
        <img
          src={
            CDN_URL_USERID + "/alternatives" + "/" + chosenAlternativeImage.name
          } 
        ></img>
      )}
    </div>
  );
}




export default NewImage;