
import { supabase } from '@/services/supabaseClient';
import { useEffect, useState } from 'react';
import styles from './YourImgDiary.module.css'

const DeleteModal = (props) =>{

    const deleteCancelHandler = props.deleteCancelHandler;
    const deletePostHandler = props.deletePostHandler;
    const postId = props.postId
    const [url, setUrl] = useState(null);

    useEffect(()=>{

      const fetchData = async() =>{
        try{
          const { data, error } = await supabase
          .from("diary_usersImages")
          .select("*")
          .eq("imageId", postId)

          if(error){
            console.error("Fehler beim Abrufen der Daten aus der Tabelle");
            return;
          }

          if(data.length > 0){
            const object = data[0]; // Das erste Objekt aus dem Array von Daten
            console.log("Gefundenes Objekt");
            setUrl(object.url)
          } else{
            console.log("Objekt nicht gefunden");
          }

        } catch(error){
          console.error("Fehler beim Abrufen der Daten aus der Tabelle:", error.message);
        }
      }

      fetchData();
    }, [postId])

 

    
    return (
      <div className={styles.modal_container}>
        <div className={styles.fixed_div}>
          <img src={url} className={styles.modal_img}/>
          <p className={styles.modal_p}>
            Möchtest du diesen Eintrag wirklich löschen?
          </p>
          <div className={styles.modal_div}>
            <button
              className={styles.delete_yes}
              onClick={() => deletePostHandler(postId)}
            >
              Ja
            </button>
            <button className={styles.delete_no} onClick={deleteCancelHandler}>
              Nein
            </button>
          </div>
        </div>
      </div>
    );
}

export default DeleteModal;