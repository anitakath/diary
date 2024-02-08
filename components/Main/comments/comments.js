import useSWR  from "swr";
import {useState, useEffect} from 'react'
import Image from "next/image";

//CONTEXT
import { useContext } from "react";
import { RedditContext } from "@/context/RedditContext";
//CNTEXT




//REDUX
import { useSelector } from "react-redux";

//STYLES
import styles from '../../../styles/Main/PostDetails.module.css'

const Comments = ({postId}) =>{
  


    const [comments, setComments] = useState([])

    const nightMode = useSelector((state)=> state.toggle)

    const {fetcher} = useContext(RedditContext)

    const { data } = useSWR(`/api/get-comments?postId=${postId}`, fetcher, {
      refreshInterval: 200,
    });

    useEffect(() => {
      if (!data) return;
      setComments(data.data);
    }, [data]);


    console.log(postId)
    console.log(comments)

    console.log(comments.id)

    const filteredComments = comments.filter(
      (comment) => comment.postId === postId
    );
    console.log(filteredComments);


     const { selectedPost, setSelectedPost } = useContext(RedditContext);



    return (
      <div
        className={
          nightMode ? styles.comments_container_dark : styles.comments_container
        }
      >
        <h1 className={styles.comments_title}> KOMMENTARE </h1>

        {filteredComments.map((comment) => (
          <div key={comment.id} className={styles.comment_container}>
            <div className={styles.image_container}>
              <Image
              src={`/${comment.profileImage}.jpg`}
              width={80}
              height={80}
              className={styles.comment_user_image}
              />
            
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
          </div>
        ))}
      </div>
    );
}


export default Comments;