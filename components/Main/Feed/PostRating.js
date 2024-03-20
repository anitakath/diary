//STYLES
import styles from "../../../styles/Main/Feed/Post.module.css";


import {  useEffect, useState } from "react";

//FONT AWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

//REDUX
import { increment, decrement } from "@/store/counterSlice";
import { useDispatch, useSelector } from "react-redux";

//API
import { updatePostVotes } from "../../../pages/api/rate-post";

//SUPABASE
import { supabase } from "@/services/supabaseClient";



const PostRating = (props) => {

  const nightMode = useSelector((state) => state.toggle.isNightMode)

  const [votes, setVotes] = useState(props.votes)
  const [isUpvoted, setIsUpvoted] = useState(null)
  const [isUpvotedTwice, setIsUpvotedTwice] = useState(false)
  const [isDownvoted, setIsDownvoted] = useState(null)
  const [isDownvotedTwice, setIsDownvotedTwice] = useState(false)


  const [upvoteWobblingEvent, setUpvoteWobblingEvent] = useState(false);
  const [downvoteWobblingEvent, setDownvoteWobblingEvent] = useState(false);
 

  const postId = props.postId
  const table = props.table; //Name der ausgewählten supabase table :-*



  useEffect(() => {
    if (upvoteWobblingEvent) {
      setTimeout(() => {
        setUpvoteWobblingEvent(false);
      }, 3000);
    }
    if (downvoteWobblingEvent) {
      setTimeout(() => {
        setDownvoteWobblingEvent(false);
      }, 3000);
    }
  }, [upvoteWobblingEvent, downvoteWobblingEvent]);






  const handleIncrement = async () => {


     if (isDownvoted) {
       setUpvoteWobblingEvent(true);
     }
  

    if(!isUpvoted){
      if (isDownvoted) {
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
        table: table,
      }); // Annahme, dass postId als Parameter übergeben wird

      await getActualizedRating();
    }

    if(isUpvoted){
      setIsUpvotedTwice(true)
      //console.log('already upvoted...removing upvote...')
      setIsUpvoted(false)




      await updatePostVotes({
        postId: props.postId,
        type: "upvotes",
        userId: props.currentGoogleUserId,
        isUpvoted: !isUpvoted,
        isUpvotedTwice: !isUpvotedTwice,
        table: table,
      }); // Annahme, dass postId als Parameter übergeben wird

      await getActualizedRating();

    }
  
  };




  const handleDecrement = async () => {


    if (isUpvoted) {
      setDownvoteWobblingEvent(true);
    }



     if (!isDownvoted) {
       if (isUpvoted) {
         return;
       }
       setIsDownvoted(true);

       await updatePostVotes({
         postId: props.postId,
         type: "downvotes",
         userId: props.currentGoogleUserId,
         isUpvoted: isUpvoted,
         isDownvoted: !isDownvoted,
         table: table,
       }); 

       await getActualizedRating();
     }


     if (isDownvoted) {

       setIsDownvotedTwice(true);
       setIsDownvoted(false);

       await updatePostVotes({
         postId: props.postId,
         type: "downvotes",
         userId: props.currentGoogleUserId,
         isUpvoted: isUpvoted,
         isDownvotedTwice: !isDownvotedTwice,
         isDownvoted: !isDownvoted,
         table: table,
       }); // Annahme, dass postId als Parameter übergeben wird

       await getActualizedRating();
     }
   

   
  };


  useEffect(() => {
    setVotes(props.votes); // Aktualisieren Sie den Wert von votes, wenn sich props.votes ändert
  }, [props.votes]);




  const getActualizedRating = async() => {
      const { data, error } = await supabase
        .from(table)
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



  useEffect(()=>{

   const checkUserAction = async () => {
     const { data, error } = await supabase
       .from(table)
       .select("user_action")
       .eq("id", postId);


      if (error) {
        return { error: error.message };
      }
     // Filtere die Daten, um nur Einträge mit user_action ungleich null zu erhalten
     const filteredData = data.filter(
       (entry) => entry.user_action !== null 
     );




     if(filteredData[0] === undefined){
       setIsDownvoted(false)
       setIsUpvoted(false)

     } else if ( filteredData[0].user_action === props.currentGoogleUserId + "_up"){
       setIsUpvoted(true)
       setIsDownvoted(false);
     } else if ( filteredData[0].user_action === props.currentGoogleUserId + "_down"){
       setIsDownvoted(true)
       setIsUpvoted(false);
     }
     
   }


   checkUserAction();

  }, [table])

  



  return (
    <div className={styles.postRating}>
      <button onClick={handleIncrement}>
        <FontAwesomeIcon
          icon={faArrowUp}
          className={`${
            nightMode ? styles.postArrowUp_dark : styles.postArrowUp
          } ${isUpvoted ? styles.upvoted : ""} ${
            upvoteWobblingEvent ? styles.wobble : ""
          }`}
        />
      </button>
      <p className={styles.amountOfRatings}> {votes} </p>
      <button onClick={handleDecrement}>
        <FontAwesomeIcon
          icon={faArrowDown}
          className={`${
            nightMode ? styles.postArrowUp_dark : styles.postArrowUp
          } ${isDownvoted ? styles.downvoted : ""} ${
            downvoteWobblingEvent ? styles.wobble : ""
          }`}
        />
      </button>
      <div className={styles.info_div}>
        {upvoteWobblingEvent && (
          <p className={styles.info_p}>
            du hast bereits ein downvote abgegeben. klicke nochmals auf dein vote, um diesen zu
            entfernen
          </p>
        )}
        {downvoteWobblingEvent && (
            <p className={styles.info_p}>
              du hast bereits ein upvote abgegeben. klicke nochmals auf dein vote, um diesen
              zu entfernen
            </p>
          )}
      </div>
    </div>
  );
};

export default PostRating;
