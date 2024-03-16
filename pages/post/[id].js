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
  const { selectedPost, setSelectedPost } = useContext(RedditContext);



  const [postDetails, setPostDetails] = useState(null);
  const [isLoaded, setIsLoaded] = useState(null)



//console.log(selectedPost)
//console.log(postDetails);

useEffect(()=>{

  if(selectedPost){
    setIsLoaded(true)
    setPostDetails(selectedPost)
  }

}, [])
  
  const router = useRouter();
  const { id } = router.query;

  //console.log(id)

  const postId = id;

         
  
  
   const nightMode = useSelector((state) => state.toggle.isNightMode);
   const [style, setStyle] = useState(false);

   useEffect(() => {
     setStyle(nightMode);
   }, [nightMode]);



  const handleGoBack = () => {
    router.back();
  };


  //console.log(postDetails)



  return (
    <div className={style ? styles.container_dark : styles.container_light}>
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
            {isLoaded && postDetails && <Post post={postDetails} />}
          </div>
        </div>

        <WebUser />
      </div>

      {postDetails && (
        <CreateComment postDetails={postDetails} postId={postDetails.id} />
      )}

      {isLoaded && postDetails && (
        <Comments postId={postDetails.id} postDetails={postDetails} />
      )}

      <Link href="/" onClick={handleGoBack} className={styles.go_back_btn}>
        Zurück zur vorherigen Seite
      </Link>
    </div>
  );
}

export default PostDetails