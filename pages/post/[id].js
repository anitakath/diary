
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


const PostDetails = () =>{


  const {selectedPost, setSelectedPost} = useContext(RedditContext)

  console.log(selectedPost)


   const nightMode = useSelector((state) => state.toggle);

   const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  /*

   useEffect(() => {
     // Check if there is a selected post in local storage and set it to the context
     const selectedPostData = JSON.parse(localStorage.getItem("selectedPost"));

     console.log(selectedPostData)
     if (selectedPostData) {
       console.log('!!!!!!!!!!!!!!')
       console.log(selectedPost)
       setSelectedPost(selectedPostData);
     }
   }, []);
*/
   

 

    return (
      <div
        className={nightMode ? styles.container_dark : styles.container_light}
      >
        <button
          onClick={handleGoBack}
          className={nightMode ? styles.go_back_dark : styles.go_back}
        >
          <FontAwesomeIcon icon={faHouse} className={styles.go_back_icon} />
        </button>
        <div className={nightMode ? styles.post_dark : styles.post_light}>
          <Post {...selectedPost} />
        </div>

        {selectedPost && <Comments postId={selectedPost.id} />}

        <button onClick={handleGoBack} className={styles.go_back_btn}>
          Zurück zur vorherigen Seite
        </button>
      </div>
    );
}

export default PostDetails