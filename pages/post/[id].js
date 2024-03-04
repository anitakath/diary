
//CNTEXT
import { RedditContext } from "@/context/RedditContext";
import { useContext , useEffect, useState} from "react";
import { useRouter } from "next/router";



//COMPONENTS
import Post from "@/components/Main/Feed/Post"
import Comments from "@/components/Main/comments/comments";


//STYLES
import styles from '../../styles/Main/PostDetails.module.css'

//REDUX
import { useSelector } from "react-redux";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

//SUPABASE
import { supabase } from "@/services/supabaseClient";
import { current } from "@reduxjs/toolkit";




const PostDetails = (props) =>{
  const { selectedPost, setSelectedPost, currentGoogleUser } =
    useContext(RedditContext);

  const [postDetails, setPostDetails] = useState(null);
  const [isLoaded, setIsLoaded] = useState(null)

  const router = useRouter();
  const { id } = router.query;

  console.log(selectedPost);

  const postId = id;

  console.log(postId);
  console.log(currentGoogleUser);

  
  
  useEffect(()=>{
    
    const checkPostId = async()=>{
      if(postId){
        console.log('there is a postId')
         const { data, error } = await supabase
           .from("feed_dummy")
           .select("*")
           .eq("id", postId);

         if (data) {
          setPostDetails(data[0]);
          setIsLoaded(true);

          let currentGoogleUserId;

          if(currentGoogleUser){
            currentGoogleUserId = currentGoogleUser.user.id
            data[0].currentGoogleUserId = currentGoogleUser.user.id;
          }

         
        }

      }else{
        console.log('theres no postId')
      }
      
      
       
       
    }

    checkPostId();

  }, [postId])
  

  console.log(isLoaded)


  console.log(postDetails);

  const nightMode = useSelector((state) => state.toggle);

  const handleGoBack = () => {
    router.back();
  };

  //  <Post {...selectedPost} />


  return (
    <div className={nightMode ? styles.container_dark : styles.container_light}>
      <button
        onClick={handleGoBack}
        className={nightMode ? styles.go_back_dark : styles.go_back}
      >
        <FontAwesomeIcon icon={faHouse} className={styles.go_back_icon} />
      </button>
      <div className={nightMode ? styles.post_dark : styles.post_light}>
       
          <div className={styles.loading_post_div}>
             {!isLoaded && (
              <div>
                <FontAwesomeIcon icon={faSpinner} spin className={styles.loadingSpinner} />
              </div>
             )}
          </div>
      
        {isLoaded && <Post {...postDetails} />}
      </div>

      {postDetails && <Comments postId={selectedPost.id} />}

      <button onClick={handleGoBack} className={styles.go_back_btn}>
        Zurück zur vorherigen Seite
      </button>
    </div>
  );
}

export default PostDetails