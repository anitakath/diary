

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
  
  const handleFileUpload = (event) => {
      setSelectedFile(event.target.files[0]);
  };

  console.log(selectedFile)


  const userId = props.currentGoogleUser.user.id
  const dispatch = useDispatch()




  const getImages = async () => {
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
        // Speichern der Bilder im Redux Store
        console.log(data)
        setImages(data);
        dispatch(setImages(data));

      } else {
        console.log(error);
      }
    } catch (error) {
      console.error(error);
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

        const { data, error } = await supabase.storage
          .from("images")
          .upload(userId + "/" + uuidv4(), selectedFile); //uuidv4() => string with bunch of chars

        if (data) {
          console.log(data);
          setIsLoading(false)
          props.closeModal();
         //getImages();
        } else {
         console.log(error);
        }
     
      }


    } catch (error) {
         console.error(error);
       }
     };

     console.log(isLoading)

     

    return (
      <div className={styles.container}>
        <h1 className={styles.title}> lade ein Foto hoch</h1>

        <form className={styles.form_div}>
          <input type="file" onChange={handleFileUpload} className={styles.file_input}/>

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