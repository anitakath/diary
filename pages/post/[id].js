
//CNTEXT
import { RedditContext } from "@/context/RedditContext";
import { useContext } from "react";
import { useRouter } from "next/router";

//COMPONENTS
import Post from "@/components/Main/Feed/Post"
import Comments from "@/components/Main/comments/comments";


//STYLES
import styles from '../../styles/Main/PostDetails.module.css'

//REDUX
import { useSelector } from "react-redux";

const PostDetails = () =>{


    const {selectedPost} = useContext(RedditContext)

   const nightMode = useSelector((state) => state.toggle);

   const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

    return (
      <div
        className={
          nightMode ? styles.container_dark : StyleSheet.container_light
        }
      >
        <div className={nightMode ? styles.post_dark : styles.post_light}>
          <Post {...selectedPost} />
        </div>

        <Comments postId={selectedPost.id} />

        <button onClick={handleGoBack} className={styles.go_back_btn}>Zurück zur vorherigen Seite</button>
      </div>
    );
}

export default PostDetails