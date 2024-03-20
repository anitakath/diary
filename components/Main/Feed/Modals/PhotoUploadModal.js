

import { useState } from "react";
import { supabase } from "@/services/supabaseClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { Dropzone } from "react-dropzone";



import styles from './PhotoUploadModal.module.css'

const PhotoUploadModal = (props) =>{

    console.log(props)

    const [selectedFile, setSelectedFile] = useState(null);
    const [description, setDescription] = useState("");

    const handleFileUpload = (files) => {
        setSelectedFile(files[0]);
    };


     const handleSubmit = async (event) => {
       event.preventDefault();

       try {
         // Upload des ausgewählten Bildes an Supabase Storage
         const { data: fileData, error: fileError } = await supabase.storage
           .from("images")
           .upload(selectedFile.name, selectedFile);

         if (fileError) {
           throw new Error(fileError.message);
         }
         // Erstelle den Post mit dem Bild-URL und der Beschreibung
         await supabase.from("users_feed").insert([
           {
             author: "User", // Hier den Autor festlegen oder aus dem aktuellen Benutzerprofil holen
             title: "New Post", // Titel festlegen oder aus dem Formular holen
             description: description,
             creator: "User", // Hier den Creator festlegen oder aus dem aktuellen Benutzerprofil holen
             upvotes: 0,
             downvotes: 0,
             table: "users_feed",
             total_votes: 0,
             image_url: fileData.Key, // URL des hochgeladenen Bildes
           },
         ]);
         props.closeModal();
       } catch (error) {
         console.error(error);
       }
     };


     /*
     const { getRootProps, getInputProps } = useDropzone({
       onDrop: handleFileUpload,
     });*/

     /*
      <Dropzone onDrop={handleFileUpload}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className={styles.dropzone}>
                <input {...getInputProps()} />
                <p>Drag & drop a file here or click to select</p>
              </div>
            )}
          </Dropzone>

    */




    return (
      <div className={styles.container}>
        <h1 className={styles.title}> lade ein Foto hoch</h1>

        <form className={styles.form_div}>
          <h className={styles.dropzone}> Dropzone </h>
          <textarea
          className={styles.description}
            placeholder="Beschreibung"
            value={description}
            onChange={(event) => setDescription(event.currentTarget.value)}
          ></textarea>

          <div className={styles.buttons_div}>
            <button className={styles.submit_btn}> hochladen </button>
            <button className={styles.close_btn} onClick={props.closeModal}>
              close
            </button>
          </div>
        </form>
      </div>
    );


}

export default PhotoUploadModal