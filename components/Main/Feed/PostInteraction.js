
import { useRouter } from "next/router";
import { useState } from "react";


//FONT AWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faShare, faTrash} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faFlag } from "@fortawesome/free-regular-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";


//SUPABASE
import { supabase } from "@/services/supabaseClient";

//STYLES
import styles from '../../../styles/Main/Feed/Post.module.css'


//REDUX
import { useDispatch} from "react-redux";


const postInteraction = (props) =>{

  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch();
  const router = useRouter();
 


  const table= props.table


  

  const deletePostHandler = async (event) =>{
    event.preventDefault();

 
    
    try{
      setIsLoading(true);

      const {data, error} = await supabase
      .from(table)
      .delete()
      .eq('id', props.postId)
     
      setIsLoading(false);
      //router.reload();
 


      router.push("/");
      
       

    } catch(error){
      console.error(error)
    } 
  }


  let comments = 4000;

  let func = num => Number(num)

  let commentsArr = Array.from(String(comments), func)


  if(comments >= 1000){
    //comments = '>1k'
    comments = '>' + commentsArr[0] + 'k'
  }

  

    return (
      <div className={styles.postInteraction}>
        <div className={styles.interaction_div}>
          <button className={styles.save_btn}>
            <FontAwesomeIcon icon={faBookmark} className={styles.icon} />
          </button>
        </div>

        <div className={styles.interaction_div}>
          <button className={styles.share_btn}>
            <FontAwesomeIcon icon={faShare} className={styles.icon} />
          </button>
        </div>

        <div className={styles.interaction_div}>
          <button className={styles.comment_btn}>
            <FontAwesomeIcon icon={faComment} className={styles.icon} />
          </button>
        </div>

        <div className={styles.interaction_div}>
          <button className={styles.delete_btn}>
            <FontAwesomeIcon
              icon={faTrash}
              className={styles.icon}
              onClick={deletePostHandler}
            />
          </button>
        </div>
      </div>
    );
}

export default postInteraction