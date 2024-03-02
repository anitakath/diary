
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

//SUPABASE
import { supabase } from "@/services/supabaseClient";


const PostDetails = (props) =>{

/*
  const [votes, setVotes] = useState(props.votes);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isUpvotedTwice, setIsUpvotedTwice] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  const [isDownvotedTwice, setIsDownvotedTwice] = useState(false);

*/

  const {selectedPost, setSelectedPost} = useContext(RedditContext)


  const [postDetails, setPostDetails] = useState()

  const router = useRouter();
  const {id} = router.query;
  console.log(id)


  console.log(selectedPost)

  const postId = id;


  useEffect(()=>{
    
    const checkPostId = async()=>{
       const { data, error } = await supabase
         .from("feed_dummy")
         .select("*")
         .eq("id", postId);

       console.log(data);

       setPostDetails(data[0])
    }

    checkPostId();

  }, [selectedPost])


  console.log(postDetails)


  


  const nightMode = useSelector((state) => state.toggle);



  const handleGoBack = () => {
    router.back();
  };


  /*
   useEffect(() => {
     const checkUserAction = async () => {
       const { data, error } = await supabase
         .from("feed_dummy")
         .select("user_action")
         .eq("id", postId);

       if (error) {
         return res.status(500).json({ error: error.message });
       }
       // Filtere die Daten, um nur Einträge mit user_action ungleich null zu erhalten
       const filteredData = data.filter((entry) => entry.user_action !== null);

       if (filteredData[0] === undefined) {
       } else if (
         filteredData[0].user_action ===
         props.currentGoogleUserId + "_up"
       ) {
         setIsUpvoted(true);
       } else if (
         filteredData[0].user_action ===
         props.currentGoogleUserId + "_down"
       ) {
         setIsDownvoted(true);
       }
     };

     checkUserAction();
   }, []); */
   

 

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