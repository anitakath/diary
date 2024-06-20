import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import { supabase } from "@/services/supabaseClient";
import { v4 as uuidv4 } from "uuid";
import { RedditContext } from "@/context/RedditContext";
//REDUX
import { useSelector } from "react-redux";
//STYLES
import styles from '../styles/NewImage.module.css'
import { useRouter } from "next/router";

const NewImage = () =>{
  const { currentGoogleUser } = useContext(RedditContext);

  const [selectedFile, setSelectedFile] = useState({
    function_type: null,
  });
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState({
    error: null,
    success: null,
  })
  
  const [successMessage, showSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [loadedImages, setLoadedImages] = useState(false);
  const [userId, setUserId] = useState(false);
  const [imageId, setImageId] = useState("");
  const nightMode = useSelector((state) => state.toggle.isNightMode);
  const [style, setStyle] = useState(false);
  const [alternativeImages, setAlternativeImages] = useState([]);
  const [title, setTitle] = useState("");
  const CDN_URL = process.env.CDN_URL;
  const CDN_URL_USERID = `${CDN_URL}${userId}`;
  const [pickedImage, setPickedImage] = useState();
  
  const imageInput = useRef();


  const [data, setData] = useState({
    userImg: null,
    alternativeImg: null,
    title: null,
    description: null,
  })

  // ------------------  NIGHT / DAY MODE TOGGLE ----------------------

  useEffect(() => {
    setStyle(nightMode);
  }, [nightMode]);


  // ------------------  CREATE USER ID ----------------------

  useEffect(() => {
    if (currentGoogleUser) {
      setUserId(currentGoogleUser.user.id);
    }
  }, [currentGoogleUser]);

  // ------------------ INPUT ONCHANGE HANDLER ----------------------


  function handlePickClick() {
    imageInput.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];

    file.function_type = "normal";
    setSelectedFile(file);
    setImageId(event.target.files[0].name);

    if(!file){
      setPickedImage(null)
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () =>{
      setPickedImage(fileReader.result)
    }

    fileReader.readAsDataURL(file)


  }




  const handleAlternativeImageChange = (e) => {
    if (e.target.type === "file") {

      // Handle file input change
      const file = e.target.files[0];
      file.function_type = "normal";
      setSelectedFile(file);
      setImageId(e.target.files[0].name);
    } else if (e.target.type === "radio") {

      // Handle radio input change
      const foundObj = alternativeImages.find(
        (obj) => obj.name === e.target.value
      );
      foundObj.function_type = "alternative";

      setSelectedFile(foundObj);
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

    

        if (images) {
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

 
 

  // ------------------  UPLOAD IMAGE POST  ----------------------

 
  const uploadImageHandler = async (event) => {
    event.preventDefault();

    // 1. check whether the object file comes from the user or is one I have provided
    // 2. check whether there is already a folder in the supabase storage bucket "images" that is ==== userId

    if(!selectedFile.function_type){
      setErrorMessage('bitte füge ein Bild hinzu ')
      return;
    }
    if (selectedFile.function_type === "normal") {
      try {
        if (selectedFile) {
          setIsLoading(true)

  

          const id = uuidv4();

          const { data, error } = await supabase.storage
            .from("images")
            .upload(userId + "/users/" + id, selectedFile); //uuidv4() => string with bunch of chars

          const url = CDN_URL_USERID + "/users" + "/" + id;


          const data_obj = {
            //created_at: selectedFile.created_at,
            url: url,
            name: title,
            description: description,
            type: "users",
          };

          console.log(data_obj)
          if(data_obj.name === ""){
            setErrorMessage("bitte gib deinem Eintrag einen Titel")
            return
          }
          if(data_obj.description === ""){
           setErrorMessage("bitte gib deinem Eintrag eine Beschreibung");
            return;
          }

             // Senden des Objekts an die Supabase-Tabelle "users_images"
             const { data: newImage, error: newError } = await supabase
               .from("users_images")
               .insert([data_obj]);

             if (newError) {
               console.error(
                 "Fehler beim Einfügen des Bildes in die Datenbank:",
                 newError.message
               );
             } else {
               console.log(
                 "Bild erfolgreich in die Datenbank eingefügt:",
                 newImage
               );
             }


             if(newImage){
               console.log(newImage)
             } else if (newError){
               console.log(newError)
             }




          if (data) {
            console.log(data);
            setIsLoading(false);
            showSuccessMessage(true)
            //props.closeModal();
            //getImages();
            fetchImages();
  
            const path = data.path;
            const parts = path.split("/"); //teilt den String an dem "/"
            const lastPart = parts[parts.length - 1];

            console.log(lastPart);

            // Upload der Beschreibung zusammen mit dem Bild in die Tabelle "image_informations"
      
          } else {
            console.log(error);
            showSuccessMessage(false)
            setIsLoading(false)
          }
        }
      } catch (error) {
        console.error(error);
      }
    } else if (selectedFile.function_type === "alternative") {



      if (selectedFile) {

        setIsLoading(true);
        const url = CDN_URL_USERID + "/alternatives" + "/" + selectedFile.name;
        console.log(url);

        const data = {
          created_at: selectedFile.created_at,
          url: url,
          name: title,
          description: description,
          type: "alternatives"
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
    }
  };

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


  const [isResized, setIsResized] = useState(false);

  const resizeImgHandler = () => {
    setIsResized(!isResized);
  };


   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

   console.log(isLoggedIn)


  return (
    <div className={style ? styles.container_dark : styles.container}>
      <form className={styles.form_div} onSubmit={uploadImageHandler}>
        <h1 className={style ? styles.title_dark : styles.title_light}>
          lade ein Foto hoch
        </h1>

        <div
          className={`${styles.usersImage_div}  ${
            isResized ? styles.resized : ""
          }`}
        >
          <input
            type="file"
            onChange={handleImageChange}
            className={styles.file_input}
            ref={imageInput}
          />
          <button
            type="button"
            className={styles.file_btn}
            onClick={handlePickClick}
          >
            + Foto
          </button>

          <div className={styles.preview}>
            {!pickedImage && <p> kein Foto ausgewählt bisher</p>}
            {pickedImage && (
              <Image
                src={pickedImage}
                onClick={resizeImgHandler}
                alt="picked image"
                width={200}
                height={200}
                className={styles.image}
              ></Image>
            )}
           
          </div>
        </div>

        <h1 className={style ? styles.title_dark : styles.title_light}>
          oder wähle ein von mir gestelltes Foto
        </h1>
        <div className={styles.alternativeImg_div}>
          {alternativeImages.map((image) => (
            <div className={styles.alternative_wrapper} key={image.id}>
              <input
                type="radio"
                id={image.name}
                name="alternativeImages"
                value={image.name}
                onChange={handleAlternativeImageChange}
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
}




export default NewImage;