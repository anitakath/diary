import { useRef } from "react";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import { supabase } from "@/services/supabaseClient";
import { v4 as uuidv4 } from "uuid";

//REDUX
import { useSelector } from "react-redux";
//STYLES
import styles from '../../styles/NewImage.module.css'

//COMPONENTS
import UserImageField from "@/components/new-image/UserImage";
import AlternativeImages from "@/components/new-image/AlternativeImages";
import {  useUser } from "@/hooks/useUser";

const NewImage = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { userId } = useUser();
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, showSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const nightMode = useSelector((state) => state.toggle.isNightMode);
  const [style, setStyle] = useState(false);
  const [alternativeImages, setAlternativeImages] = useState([]);
  const [title, setTitle] = useState("");
  const CDN_URL = process.env.CDN_URL;
  const CDN_URL_USERID = `${CDN_URL}${userId}`;
  const [pickedImage, setPickedImage] = useState();
  const imageInput = useRef();

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);


  const handleImageToStorageUpload = async (id) => {
    if (!selectedFile) {
      alert("Bitte wählen Sie eine Datei aus.");
      return;
    }
    
    try {
      const { data, error } = await supabase.storage
        .from("images")
        .upload(`${userId}/${id}${selectedFile.name}`, selectedFile);

      if (error) {
        console.error(error.message);
      } else {
        console.log("Bild erfolgreich hochgeladen");
      }
    } catch (error) {
      console.error("Fehler beim Hochladen des Bildes:", error.message);
    }
    setUploading(false);
  };


  // ------------------  NIGHT / DAY MODE TOGGLE ----------------------

  useEffect(() => {
    setStyle(nightMode);
  }, [nightMode]);

  // ------------------ INPUT ONCHANGE HANDLER ----------------------

  function handlePickClick() {
    imageInput.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];

    file.function_type = "normal";
    setSelectedFile(file);

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }

  const handleAlternativeImageChange = (e) => {
    if (e.target.type === "file") {
      // Handle file input change
      const file = e.target.files[0];
      file.function_type = "normal";
      setSelectedFile(file);
    } else if (e.target.type === "radio") {
      // Handle radio input change
      const foundObj = alternativeImages.find(
        (obj) => obj.name === e.target.value
      );
      foundObj.function_type = "alternative";

      setSelectedFile(foundObj);
    }
  };


 
  const handleTableUpload = async (id) => {

    setIsLoading(true);
    const url = CDN_URL_USERID + "/" + id + selectedFile.name;

    const data_obj = {
      url: url,
      title: title,
      description: description,
      type: "users",
      userId: userId,
      imageId: id + selectedFile.name,
    };

    if (data_obj.name === "") {
      setErrorMessage("bitte gib deinem Eintrag einen Titel");
      return;
    }
    if (data_obj.description === "") {
      setErrorMessage("bitte gib deinem Eintrag eine Beschreibung");
      return;
    }

  
    const { data: newImage, error: newError } = await supabase
      .from("diary_usersImages")
      .insert([data_obj]);

      if (newError) {
        console.error(
          "Fehler beim Einfügen des Bildes in die Datenbank:",
          newError.message
        );
      } else {
        console.log("Bild erfolgreich in die Datenbank eingefügt:", newImage);
        showSuccessMessage(true);
        setIsLoading(false);
        //props.closeModal();
      }
  };

  // ------------------  UPLOAD IMAGE POST  ----------------------

  const uploadImageHandler = async (event) => {
    event.preventDefault();
    setUploading(true);

    // 1. check whether the object file comes from the user or is one I have provided
    // 2. check whether there is already a folder in the supabase storage bucket "images" that is ==== userId

    if (!selectedFile.function_type) {
      setErrorMessage("bitte füge ein Bild hinzu ");
      return;
    }

    if (selectedFile.function_type === "normal") {

      const id = uuidv4();
      
      await handleImageToStorageUpload(id);
      handleTableUpload(id)

    } /*else if (selectedFile.function_type === "alternative") {
      if (selectedFile) {
        setIsLoading(true);
        const url = CDN_URL_USERID + "/alternatives" + "/" + selectedFile.name;
        console.log(url);

        const data = {
          created_at: selectedFile.created_at,
          url: url,
          name: title,
          description: description,
          type: "alternatives",
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
          //console.log("Bild erfolgreich in die Datenbank eingefügt:", newImage);
          setIsLoading(false);
          showSuccessMessage(true);
        }
      }
    }*/
  };
  /*
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
      } catch (error) {
        console.error("An error occurred:", error.message);
      }
    };

    uploadAlternativeImages();
  }, []);
  */

  const [isResized, setIsResized] = useState(false);

  const resizeImgHandler = () => {
    setIsResized(!isResized);
  };

  return (
    <div className={style ? styles.container_dark : styles.container}>
      <form className={styles.form_div} onSubmit={uploadImageHandler}>
        <h1 className={style ? styles.title_dark : styles.title_light}>
          lade ein Foto hoch
        </h1>

        <UserImageField
          handleImageChange={handleImageChange}
          imageInput={imageInput}
          handlePickClick={handlePickClick}
          pickedImage={pickedImage}
          resizeImgHandler={resizeImgHandler}
          isResized={isResized}
        />

        <h1 className={style ? styles.title_dark : styles.title_light}>
          oder wähle ein von mir gestelltes Foto
        </h1>

        <AlternativeImages
          alternativeImages={alternativeImages}
          handleAlternativeImageChange={handleAlternativeImageChange}
        />

        <input
          type="text"
          placeholder="Titel"
          className={styles.form_title}
          onChange={(event) => setTitle(event.target.value)}
          value={title}
        ></input>

        <textarea
          className={styles.description}
          placeholder="beschreibe dein Foto hier "
          onChange={(event) => setDescription(event.currentTarget.value)}
        ></textarea>

        <button type="submit" className={styles.submit_btn}>
          {isLoading ? "lädt..." : "hochladen"}
        </button>

        {!successMessage && successMessage != null && (
          <p className={styles.successMessage}>
            wähle erst ein Foto aus und beschreibe es, bevor du es hochlädst
          </p>
        )}
        {successMessage && (
          <div>
            <p className={styles.successMessage}>
              dein Foto-Eintrag wurde erfolgreich gespeichert! Danke 🫶🏼
            </p>
            <Link href="/" className={styles.goBack_link}>
              zurück
            </Link>
          </div>
        )}
        {errorMessage && !successMessage && (
          <p className={styles.errorMessage}> {errorMessage} </p>
        )}
      </form>
    </div>
  );
};

export default NewImage;
