import { useContext, useEffect, memo } from "react";
import { useRouter } from "next/router";


//STYLES
import styles from "../../../styles/Main/Feed/Post.module.css";

//COMPONENTS
import PostRating from "./PostRating";
import PostInteraction from "./PostInteraction";

//REDUX
import { useSelector } from "react-redux";


import { RedditContext } from "@/context/RedditContext";

const Post = (props) => {
  const post = props.post;



  const pathId = post.pathId;
  
  const id = post.id;


  const created_at = post.created_at;

  const description = post.description;
  const downvotes = post.downvotes;
  const title = post.title;

  const upvotes = post.upvotes;

  const author = post.author;

  const table = post.table;
  

  const nightMode = useSelector((state) => state.toggle.nightMode);



  let totalvote = upvotes - downvotes;

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

  const router = useRouter();

  const { setSelectedPost } = useContext(RedditContext);



  const navigateToPostDetails = () =>{

    localStorage.setItem(
      "selectedPost",
      JSON.stringify(post)
    );

    setSelectedPost(post)


    router.push(`/post/${pathId}`);

  
  }
    

  return (
    <div className={styles.post_container}>
      <div className={styles.postRating_container}>
        <PostRating
          table={table}
          votes={totalvote}
          postId={id}
          currentGoogleUserId={props.currentGoogleUserId}
        />
      </div>

      <div className={styles.postField} onClick={navigateToPostDetails}>
        <div className={styles.postInfo}>
          <p className={styles.postInfo_p}>
            <span> {author}</span> - {formattedDateTime.date} -{" "}
            {formattedDateTime.time}
          </p>
        </div>
        <div className={styles.postItself}>
          <h1
            className={nightMode ? styles.post_title_dark : styles.post_title}
          >
            {title}
          </h1>
          <p>{description} </p>
        </div>
        <div className={styles.postInteraction}>
          <PostInteraction postId={id} post={post} />
        </div>
      </div>
    </div>
  );
}

export default Post;
