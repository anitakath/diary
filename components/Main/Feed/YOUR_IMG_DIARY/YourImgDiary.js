
import { useState, useEffect, useContext } from 'react';
import styles from './YourImgDiary.module.css'
import { supabase } from '@/services/supabaseClient';
import { RedditContext } from '@/context/RedditContext';
//REDUX
import { useSelector } from "react-redux";
import Link from 'next/link';



const YourImgDiary = () =>{
  const { currentGoogleUser } = useContext(RedditContext);
  const nightMode = useSelector((state) => state.toggle.isNightMode);
  const [style, setStyle] = useState(false);
  const [images, setImages] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [userId, setUserId] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);

  useEffect(() => {
    setStyle(nightMode);
  }, [nightMode]);


  useEffect(()=>{
    if(currentGoogleUser){
      setUserId(currentGoogleUser.user.id)
    }
  }, [])


  useEffect(() =>{
    const fetchImages = async() =>{
      const { data, error } = await supabase
        .from("users_images")
        .select("*")
        .order("id", { ascending: false });
      if(data){
        setImages(data)
        setImagesLoaded(true)
      } else{
        console.log(error)
      }
    }
    fetchImages()
  }, [userId])


  const handleDeleteConfirmation = (postId) => {
    setPostIdToDelete(postId);
    setShowDeleteModal(true);
  };
 

  const deletePostHandler = async() =>{
    try {
      const { data, error } = await supabase
        .from("users_images")
        .delete()
        .eq("id", postIdToDelete);

        if (error) {
          console.error(error);
        } else {
          setImages(images.filter((image) => image.id !== postIdToDelete));
        }
      setShowDeleteModal(false);
    } catch (error) {
        console.error(error);
    }
  }

  const deleteCancelHandler = () => {
   setShowDeleteModal(false);
  };

  return (
    <div className={styles.container}>
      <Link
        href="/dein-bildertagebuch"
        className={style ? styles.link_darkmode_first : styles.link_first}
      >
        Tagebuch-Übersicht
      </Link>
      {imagesLoaded &&
        images.map((image) => (
          <div className={styles.diarypost_div} key={image.id}>
            <div className={styles.options_div}>
              <Link
                className={style ? styles.link_darkmode : styles.link}
                href={`/dein-bildertagebuch/${image.name.replace(/\s+/g, "-")}`}
              >
                Eintrag einsehen
              </Link>

              <button
                className={styles.delete_btn}
                onClick={() => handleDeleteConfirmation(image.id)}
              >
                Eintrag löschen
              </button>
            </div>
            <img src={image.url} key={image.id} className={styles.img}></img>
          </div>
        ))}

      {showDeleteModal && (
        <div className={styles.modal_container}>
          <p className={styles.modal_p}>
            Möchtest du diesen Eintrag wirklich löschen?
          </p>
          <div className={styles.modal_div}>
            <button className={styles.delete_yes} onClick={(() => deletePostHandler(postIdToDelete))}>
              Ja
            </button>
            <button className={styles.delete_no} onClick={deleteCancelHandler}>
              Nein
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


export default YourImgDiary