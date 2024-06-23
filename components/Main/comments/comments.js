import useSWR  from "swr";
import {useState, useEffect} from 'react'
import Image from "next/image";

//CONTEXT
import { useContext } from "react";
import { RedditContext } from "@/context/RedditContext";



//import TimeAgo from "timeago.js";
//import TimeAgo from "timeago.js/es";
import { format as timeAgoFormat } from "timeago.js";


//REDUX
import { useSelector } from "react-redux";

//STYLES
import styles from './Comments.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faFlag,  faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { faEllipsis, faSpinner } from "@fortawesome/free-solid-svg-icons";


const Comments = (props) =>{
  const postId = props.postDetails.id;
  const table = props.postDetails.table;
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true); // Zustandsvariable für Ladezustand
  const nightMode = useSelector((state) => state.toggle.isNightMode);
  const { fetcher } = useContext(RedditContext);

  const { data } = useSWR(
    `/api/get-comments?postId=${postId}&table=${table}`,
    fetcher,
    {
      refreshInterval: 200,
      onSuccess: () => setLoading(false),
    }
  );


  useEffect(() => {
    if (!data) return;
    setComments(data.data);
  }, [data]);

  const filteredComments = comments.filter(
    (comment) => comment.postId === postId
  ).reverse();



 const timeAgoFormat = (date) => {
   const currentDate = new Date();
   const diffTime = Math.abs(currentDate - date);
   const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));


   if (diffDays < 1) {
     const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
     if (diffHours < 1) {
       return "just now";
     } else if (diffHours === 1) {
        return "1 hour ago";
     } else {
       return `${diffHours} hours ago`;
     }
   } else if (diffDays === 1) {
     return "1 day ago";
   } else {
     return `${diffDays} days ago`;
   }
 };

  const postDateValue = props.postDetails.created_at;
  const postDateObject = new Date(postDateValue);
  const formattedPostDate = postDateObject.toISOString().split("T")[0];
  const formattedTime = timeAgoFormat(new Date(formattedPostDate));

  console.log(filteredComments)


  
  return (
    <div
      className={
        nightMode ? styles.comments_container_dark : styles.comments_container
      }
    >
      <h1 className={styles.comments_title}> KOMMENTARE </h1>
      {loading ? (
        // Wenn loading true ist, zeige den Lade-Spinner
        <FontAwesomeIcon
          icon={faSpinner}
          spin
          className={styles.loadingSpinner}
        />
      ) : filteredComments.length === 0 ? (
        <p className={styles.noComments_p}> Bisher sind  für diesen Eintrag noch keine Kommentare vorhanden </p>
      ) : (
        filteredComments.map((comment) => (
          <div key={comment.id} className={styles.comment_container}>
            <div className={styles.image_container}>
              {comment.profileImage.includes("http") ? (
                <Image
                  alt="Bild eines Benutzers, der bereits einen Kommentar zu diesem Beitrag abgegeben hat"
                  src={comment.profileImage}
                  width={80}
                  height={80}
                  className={styles.comment_user_image}
                />
              ) : (
                <Image
                  alt="image of a user who has already commented on this post"
                  src={`/${comment.profileImage}.jpg`}
                  width={80}
                  height={80}
                  className={styles.comment_user_image}
                />
              )}
            </div>
            <div className={styles.comment_text_container}>
              <h1
                className={
                  nightMode
                    ? styles.comment_title_dark
                    : styles.comment_title_light
                }
              >
                {comment.author}
                <span className={styles.formattedTime}>
                  {timeAgoFormat(new Date(comment.created_at))}
                </span>
              </h1>
              <h2
                className={
                  nightMode
                    ? styles.comment_text_dark
                    : styles.comment_text_light
                }
              >
                {comment.text}
              </h2>
            </div>
            <div className={styles.reaction_div}>
              <FontAwesomeIcon
                icon={faHeart}
                className={styles.like_reaction_icon}
              />
              <FontAwesomeIcon
                icon={faCommentDots}
                className={styles.reply_reaction_icon}
              />
              <FontAwesomeIcon
                icon={faFlag}
                className={styles.report_reaction_icon}
              />
              <FontAwesomeIcon
                icon={faEllipsis}
                className={styles.mobile_reactions_icon}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
}


export default Comments;