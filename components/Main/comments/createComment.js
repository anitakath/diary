

import { useContext, useEffect, useState } from "react";


import { supabase } from "@/services/supabaseClient";

//CONTEXT
import { RedditContext } from "@/context/RedditContext";
import { useRouter } from "next/router";

//STYLES
import styles from "./Comments.module.css";


//REDUX
import { useSelector } from "react-redux";

const CreateComment = (props) => {
  const [commentText, setCommentText] = useState("");

  const nightMode = useSelector((state) => state.toggle.isNightMode);

  const postId = props.postId;

  //const currentGoogleUser = props.postDetails.id
  const { selectedPost, setSelectedPost, currentGoogleUser } =
    useContext(RedditContext);
/*
  console.log(currentGoogleUser);

  //annowagno@gmail.com
  console.log(currentGoogleUser.user.email);
  
  //Anne Wagner
  console.log(currentGoogleUser.user.identities[0].identity_data.full_name);

  //https://lh3.googleusercontent.com/a/ACg8ocLD4HBMU99lmy7Z9pLEtGbnC4ucHOEXY9NPoMLZur-1mPU=s96-c
  console.log(currentGoogleUser.user.user_metadata.avatar_url);

  console.log(props);

  */
  const handleCommentSubmit = async () => {
    if (commentText.trim() === "") {
      alert(
        "Bitte geben Sie einen Kommentar ein, bevor Sie ihn absenden :-) ."
      );
      return;
    }

    try {
      const currentDate = new Date().toISOString(); 
      const { data, error } = await supabase.from("comments").insert([
        {
          postId: postId,
          created_at: currentDate,
          author: currentGoogleUser.user.identities[0].identity_data.full_name,
          user_email: currentGoogleUser.user.email,
          profileImage: currentGoogleUser.user.user_metadata.avatar_url,
          user_id: currentGoogleUser,
          text: commentText,
        },
      ]);

      console.log(data);

      if (error) {
        console.error("Fehler beim Speichern des Kommentars:", error.message);
        return;
      }

      console.log("Kommentar erfolgreich gespeichert:", data);

      // Optional: Setze das Kommentarfeld zurück
      setCommentText("");
    } catch (error) {
      console.error("Fehler beim Speichern des Kommentars:", error.message);
    }
  };

  return (
    <div className={styles.createComment_div}>
      <h2 className={nightMode ? styles.title_light : styles.title_dark}>
        KOMMENTAR ERSTELLEN
      </h2>
      <div className={nightMode ? styles.textarea_div_dark : styles.textarea_div}>
        <textarea
          className={nightMode ? styles.textarea_dark : styles.textarea_light}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Geben Sie hier Ihren Kommentar ein..."
        ></textarea>
        <button onClick={handleCommentSubmit}>Kommentar absenden</button>
      </div>
    </div>
  );
};

export default CreateComment;
