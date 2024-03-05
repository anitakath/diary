import Link from "next/link";



//CONTEXT
import { RedditContext } from "@/context/RedditContext";
import { useContext , useEffect, useState} from "react";
import { useRouter } from "next/router";



//COMPONENTS
import Post from "@/components/Main/Feed/Post"
import Comments from "@/components/Main/comments/comments";
import CreateComment from "@/components/Main/comments/createComment";
import WebUser from "@/components/Main/WebUser";

//STYLES
import styles from '../../styles/Main/Feed/PostDetails.module.css'

//REDUX
import { useSelector, useDispatch } from "react-redux";
import { login } from "@/store/authSlice";


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



  const postId = id;



 

  
  
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
  


  const nightMode = useSelector((state) => state.toggle.isNightMode);

  const handleGoBack = () => {
    router.back();
  };


  console.log(postDetails)

  return (
    <div className={nightMode ? styles.container_dark : styles.container_light}>
     
      <div className={styles.comment_wrapper}>
        <div className={nightMode ? styles.post_dark : styles.post_light}>
          <div className={styles.loading_post_div}>
            {!isLoaded && (
              <div>
                <FontAwesomeIcon
                  icon={faSpinner}
                  spin
                  className={styles.loadingSpinner}
                />
              </div>
            )}
          </div>

          <div className={styles.post_div}>
            {isLoaded && <Post {...postDetails} />}
          </div>
        </div>

        <div className={styles.webUser_div}> 
          <WebUser/>
        </div>
      </div>

      {postDetails && (
        <CreateComment postDetails={postDetails} postId={postDetails.id} />
      )}

      {postDetails && (
        <Comments postId={postDetails.id} postDetails={postDetails} />
      )}

      <Link href="/" onClick={handleGoBack} className={styles.go_back_btn}>
        Zurück zur vorherigen Seite
      </Link>
    </div>
  );
}

export default PostDetails