import { useContext } from "react";
import { useRouter } from "next/router";


//STYLES
import styles from "../../../styles/Main/Feed/Post.module.css";

//COMPONENTS
import PostRating from "./PostRating";
import PostInteraction from "./PostInteraction";

//REDUX
import { useSelector } from "react-redux";


import { RedditContext } from "@/context/RedditContext";

const Post = ({post}) => {


  const {
     pathId,
     id,
     created_at,
     description,
     downvotes,
     title,
     upvotes,
     author,
     table,
   } = post;



  const nightMode = useSelector((state) => state.toggle.nightMode);
  let totalvote = upvotes - downvotes;
  const router = useRouter();
  const { setSelectedPost, currentGoogleUser } = useContext(RedditContext);


  const navigateToPostDetails = () => {
    setSelectedPost(post);
    router.push(`/post/${pathId}`);
  };

  const formatDate = (timestamp) => {
    const dateObj = new Date(timestamp);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = dateObj.toLocaleDateString("de-DE", options);
    const time = dateObj.toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return { date, time };
  };

  const formattedDateTime = formatDate(created_at);
    

  return (
    <div className={styles.post_container}>
      
      <PostRating
        table={table}
        votes={totalvote}
        postId={id}
        currentGoogleUserId={currentGoogleUser}
      />
      

      <div className={styles.postField} onClick={navigateToPostDetails}>
        <div className={styles.header_div}>
          <h2 className={styles.header}>
            <span> {author}</span> - {formattedDateTime.date} -{" "}
            {formattedDateTime.time}
          </h2>
        </div>  

        <div className={styles.post}>
          <h1
            className={nightMode ? styles.post_title_dark : styles.post_title}
          >
            {title}
          </h1>
          <p className={styles.post_text}>{description} </p>
        </div>
      
        <PostInteraction postId={id} post={post} table={post.table}  />
 
      </div>


    </div>
  );
}

export default Post;
