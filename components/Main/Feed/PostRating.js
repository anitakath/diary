//STYLES
import styles from "../../../styles/Main/Feed/Post.module.css";

//CONTEXT
import { RedditContext } from "@/context/RedditContext";


import { useContext, useEffect, useState } from "react";

//FONT AWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

//REDUX
import { increment, decrement } from "@/store/counterSlice";
import { useDispatch, useSelector } from "react-redux";

//API
//import { updatePostVotes } from '../api/rate-post'; // Annahme, dass Sie die API-Funktion zum Aktualisieren der Datenbank haben
import { updatePostVotes } from "../../../pages/api/rate-post";

//SUPABASE
import { supabase } from "@/services/supabaseClient";
import { current } from "@reduxjs/toolkit";



const PostRating = (props) => {

  const dispatch = useDispatch();
  const currCount = useSelector((state) => state.counter);
  const nightMode = useSelector((state) => state.toggle)

  const [votes, setVotes] = useState(props.votes)
  const [isUpvoted, setIsUpvoted] = useState(false)
  const [isUpvotedTwice, setIsUpvotedTwice] = useState(false)
  const [isDownvoted, setIsDownvoted] = useState(false)
  const [isDownvotedTwice, setIsDownvotedTwice] = useState(false)

  const postId = props.postId


  const handleIncrement = async () => {


    if(!isUpvoted){
      console.log('post is not upvoted but going to be upvoted...')
      if (isDownvoted) {
        console.log('...even though it was downvoted first.')
        //setIsDownvoted(false);
        return;
      }
      setIsUpvoted(true);

      // dispatch(increment());
      await updatePostVotes({
        postId: props.postId,
        type: "upvotes",
        userId: props.currentGoogleUserId,
        isUpvoted: !isUpvoted,
        isDownvoted: isDownvoted,
      }); // Annahme, dass postId als Parameter übergeben wird

      await getActualizedRating();
    }

    if(isUpvoted){
      console.log('post is already upvoted')
      setIsUpvotedTwice(true)
      setIsUpvoted(false)


      await updatePostVotes({
        postId: props.postId,
        type: "upvotes",
        userId: props.currentGoogleUserId,
        isUpvoted: !isUpvoted,
        isUpvotedTwice: !isUpvotedTwice,
      }); // Annahme, dass postId als Parameter übergeben wird

      await getActualizedRating();

    }
  
  };

  const handleDecrement = async () => {


     if (!isDownvoted) {
       console.log("post is not downvoted but going to be downvoted...");
       if (isUpvoted) {
         console.log("...even though it was upvoted first.");
         //setIsUpvoted(false);
         return;
       }
       setIsDownvoted(true);

       // dispatch(increment());
       await updatePostVotes({
         postId: props.postId,
         type: "downvotes",
         userId: props.currentGoogleUserId,
         isUpvoted: isUpvoted,
         isDownvoted: !isDownvoted,
       }); // Annahme, dass postId als Parameter übergeben wird

       await getActualizedRating();
     }


     if (isDownvoted) {
       console.log("post is already downvoted");
       setIsDownvotedTwice(true);
       setIsDownvoted(false);

       await updatePostVotes({
         postId: props.postId,
         type: "downvotes",
         userId: props.currentGoogleUserId,
         isUpvoted: isUpvoted,
         isDownvotedTwice: !isDownvotedTwice,
         isDownvoted: !isDownvoted,
       }); // Annahme, dass postId als Parameter übergeben wird

       await getActualizedRating();
     }
   

   
  };


  useEffect(() => {
    setVotes(props.votes); // Aktualisieren Sie den Wert von votes, wenn sich props.votes ändert
  }, [props.votes]);



  const getActualizedRating = async()=>{
      const { data, error } = await supabase
        .from("feed_dummy")
        .select("upvotes, downvotes")
        .eq("id", postId);

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      const upvotes = data[0].upvotes;
      const downvotes = data[0].downvotes;
      const totalvots = upvotes - downvotes
      setVotes(totalvots)

  }
  



  return (
    <div className={styles.postRating}>
      <button onClick={handleIncrement}>
        <FontAwesomeIcon
          icon={faArrowUp}
   
          className={`${nightMode ? styles.postArrowUp_dark : styles.postArrowUp} ${isUpvoted? styles.upvoted : ''}`}
        />
      </button>
      <p className={styles.amountOfRatings }> {votes} </p>
      <button onClick={handleDecrement}>
        <FontAwesomeIcon
          icon={faArrowDown}
          className={`${nightMode ? styles.postArrowUp_dark : styles.postArrowUp} ${isDownvoted ? styles.downvoted : ''}`}
          
        />
      </button>
    </div>
  );
};

export default PostRating;
