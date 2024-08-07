
import { useState, useEffect, useContext } from 'react';
import styles from './YourImgDiary.module.css'
import { supabase } from '@/services/supabaseClient';
//COMPONENTS
import DeleteModal from './DeleteModal';
//REDUX
import { useSelector } from "react-redux";
import Link from 'next/link';

import { useUser } from '@/hooks/useUser';
import { useDispatch } from 'react-redux';
import { setSupebaseImages } from '@/store/supabaseImagesSlice';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//HOOKS
import {deleteImageFromStorage} from '../../../../hooks/StorageHandler'
import {deleteEntryFromTable} from '../../../../hooks/TableHandler'

const YourImgDiary = (props) =>{
  const nightMode = useSelector((state) => state.toggle.isNightMode);
  const [style, setStyle] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true)
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { userId } = useUser();
  const CDN_URL_USERID = props.CDN_URL_USERID;

    
  useEffect(() => {
    setStyle(nightMode);
  }, [nightMode]);


  useEffect(() => {
    
    const fetchUsersImages = async () => {
      try{
        setLoading(true);
        setImagesLoaded(false)
        const { data, error } = await supabase.storage
          .from("images")
          .list(userId + "/", {
            limit: 100,
            offset: 0,
            sortBy: { column: "name", order: "asc" },
          });

         if (error) {
           console.error(error.message);
           setLoading(false);
           return;
         }

         if (data && data.length > 0) {
           const cutAlternativeObject = data.filter(
             (obj) => obj.name !== "alternatives"
           );
           const filteredImages = cutAlternativeObject.filter(
             (image) => !image.name.startsWith(".")
           );

           const filteredSortedImages = filteredImages.filter(
             (image) => image.name !== "users"
           );

           const sortedImages = filteredSortedImages
             .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
             .map((image) => ({ ...image, loaded: false }));


           setImages(sortedImages);
           setLoading(false);
           setImagesLoaded(true);
         } else {
           setLoading(false);
           
         }
      } catch(error){
        console.error("Fehler beim Abrufen der Bilder:", error.message);
        setLoading(false);
      }
     
    };
    fetchUsersImages();
  }, [userId]);



  const [postId, setPostId] = useState(null)


  const handleDeleteConfirmation = (postId) => {
    setShowDeleteModal(true);
    setPostId(postId)
  };

  const deletePostHandler = async (postId) => {
    try{
      //custom hook component
      await deleteImageFromStorage(images, postId, userId)
      // custom hook component
      await deleteEntryFromTable(postId);

      window.location.reload();

    } catch(error){
      console.error("Fehler beim Löschen des Bildes..", )
    }

    console.log('delete entry from table')



  };

  const deleteCancelHandler = () => {
    setShowDeleteModal(false);
  };




  return (
    <div className={styles.container}>
      {!imagesLoaded && loading && (
        <p className={styles.loading_entries_p}>
          deine Einträge werden geladen ...
        </p>
      )}

      {imagesLoaded &&
        !loading &&
        images.map((image) => (
          <div key={image.id} className={styles.image_div}>
            <div className={styles.image_options_div}>
              <Link
                href={`/dein-bildertagebuch/${image.name.replace(/\s+/g, "-")}`}
                className={style ? styles.img_link_dark : styles.img_link}
              >
                Eintrag einsehen
              </Link>
              <button
                className={style ? styles.delete_btn_dark : styles.delete_btn}
                onClick={() => handleDeleteConfirmation(image.name)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
            <img
              key={image.id}
              src={CDN_URL_USERID + "/" + image.name}
              alt="gallery-image"
              className={styles.img}
            />
          </div>
        ))}

      {!imagesLoaded && !loading && (
        <p className={styles.loading_entries_p}> keine Einträge vorhanden </p>
      )}

      {showDeleteModal && (
        <DeleteModal
          postId={postId}
          deletePostHandler={deletePostHandler}
          deleteCancelHandler={deleteCancelHandler}
        />
      )}
    </div>
  );
}


export default YourImgDiary