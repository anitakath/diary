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


export async function getServerSideProps(context) {
  const postId = context.params.id; // Extrahiere die Post-ID aus dem Pfadparameter

  // Rufe Daten aus beiden Tabellen ab und filtere nach der Post-ID
  const { data: postFromTable1 } = await supabase
    .from("feed_dummy")
    .select("*")
    .eq("pathId", postId)
    .single();
  const { data: postFromTable2 } = await supabase
    .from("users_feed")
    .select("*")
    .eq("pathId", postId)
    .single();

  // Überprüfe, ob der Post in einer der Tabellen gefunden wurde
  const post = postFromTable1 || postFromTable2;


  return {
    props: {
      post,
    },
  };
}



const PostDetails = ({post}) =>{

  const router = useRouter();
  const nightMode = useSelector((state) => state.toggle.isNightMode);
  const [style, setStyle] = useState(false);

  const [postDetails, setPostDetails] = useState(null);
  const [isLoaded, setIsLoaded] = useState(null);



  
  useEffect(() => {
    if (post) {
      setIsLoaded(true)
      setPostDetails(post)
    }
  }, []);


  useEffect(() => {
    setStyle(nightMode);
  }, [nightMode]);

  const handleGoBack = () => {
    router.back();
  };


 



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
            {isLoaded && <Post post={post} />}
          </div>
        </div>

        <div className={styles.webUser_div}>
          <WebUser />
        </div>
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