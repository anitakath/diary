

import { useState } from "react";
import { supabase } from "@/services/supabaseClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { Dropzone } from "react-dropzone";
import { useDropzone } from "react-dropzone";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import {v4 as uuidv4 } from 'uuid';

import styles from './PhotoUploadModal.module.css'


//REDUX
import { useDispatch, useSelector } from "react-redux";
import { setImages } from "@/store/supabaseImagesSlice";



const PhotoUploadModal = (props) =>{

  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [loadedImages, setLoadedImages] = useState(false);
  const [imageId, setImageId] = useState("")
  const nightMode = props.nightMode

  console.log(nightMode)

  const handleFileUpload = (event) => {
      setSelectedFile(event.target.files[0]);
      setImageId(event.target.files[0].name);
  };

  console.log(selectedFile)
  console.log(imageId)
  console.log(images)



  const userId = props.currentGoogleUser.user.id
  const dispatch = useDispatch()



  const uploadDescription = async () =>{

    console.log(userId)
    console.log(images.name)
    console.log(description)
    console.log(imageId)
    try {
      const { data, error } = await supabase
        .from("image_informations")
        .insert([
          { 
            description: description,
          }
        ])
     

      if (data) {
        console.log("Description uploaded successfully");
      } else {
        console.log(error);
      }
    
    } catch (error) {
      console.error(error);
    }
    

  }


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

  console.log(supabaseImages);






  const uploadImageHandler = async (event) => {
    event.preventDefault();
    console.log(selectedFile)
    setIsLoading(true)

    try {

      if(selectedFile){
        // userId/nameOfImg.jpg
        // Upload des ausgewählten Bildes an Supabase Storage

        const { data, error } = await supabase
          .storage
          .from("images")
          .upload(userId + "/" + uuidv4(), selectedFile); //uuidv4() => string with bunch of chars

        if (data) {
          console.log(data);
          setIsLoading(false);
          props.closeModal();
          //getImages();
          fetchImages();
          console.log(data.path)
          const path = data.path;
          const parts = path.split("/") //teilt den String an dem "/"
          const lastPart = parts[parts.length -1]

          console.log(lastPart)

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

     console.log(isLoading)
     console.log(description);

     

    return (
      <div className={nightMode ? styles.container_dark : styles.container}>
        <h1 className={styles.title}> lade ein Foto hoch</h1>

        <form className={styles.form_div}>
          <input
            type="file"
            onChange={handleFileUpload}
            className={styles.file_input}
          />

          <textarea
            className={styles.description}
            placeholder="beschreibe deinen Text hier "
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
            <button className={styles.close_btn} onClick={props.closeModal}>
              close
            </button>
          </div>
        </form>
      </div>
    );


}

export default PhotoUploadModal