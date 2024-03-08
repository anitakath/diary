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
  const [isUpvoted, setIsUpvoted] = useState(false)
  const [isUpvotedTwice, setIsUpvotedTwice] = useState(false)
  const [isDownvoted, setIsDownvoted] = useState(false)
  const [isDownvotedTwice, setIsDownvotedTwice] = useState(false)

  const postId = props.postId



  const handleIncrement = async () => {


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
      }); // Annahme, dass postId als Parameter übergeben wird

      await getActualizedRating();
    }

    if(isUpvoted){
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
       }); 

       await getActualizedRating();
     }


     if (isDownvoted) {

       setIsDownvotedTwice(true);
       alert('du hast den Beitrag bereits gedownvoted')
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

  useEffect(()=>{

   const checkUserAction = async () =>{
     const { data, error } = await supabase
       .from("feed_dummy")
       .select("user_action")
       .eq("id", postId);

     if (error) {
       return res.status(500).json({ error: error.message });
     }
     // Filtere die Daten, um nur Einträge mit user_action ungleich null zu erhalten
     const filteredData = data.filter(
       (entry) => entry.user_action !== null 
     );


     if(filteredData[0] === undefined){

     } else if ( filteredData[0].user_action === props.currentGoogleUserId + "_up"){
       setIsUpvoted(true)
     } else if ( filteredData[0].user_action === props.currentGoogleUserId + "_down"){
       setIsDownvoted(true)
     }
     
   }


   checkUserAction();

  }, [])

  



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
