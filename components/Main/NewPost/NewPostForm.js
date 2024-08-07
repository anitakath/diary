import Link from "next/link";


import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { supabase } from "@/services/supabaseClient";

//STYLES
import styles from "./NewPostForm.module.css";

//REDUX
import { filter } from "@/store/filterSlice";
import { useDispatch, useSelector } from "react-redux";


//FONT AWESOME
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


//COMPONENTS
import WebUser from "../WebUser";
import Start from "@/components/Start";
import { useUser } from "@/hooks/useUser";

const NewPostForm = () => {

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

  const nightMode = useSelector((state) => state.toggle.isNightMode);
  const [style, setStyle] = useState(false);

  useEffect(() => {
    setStyle(nightMode);
  }, [nightMode]);

  const { userId } = useUser();




  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

 

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();


  const createPost = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      if (author === "" && title === "" && text === "") {
        console.log("insert!");
        return;
      }

      const formattedAuthor = author.replace(/\s+/g, "-"); // Ersetze Leerzeichen durch Bindestriche
      const formattedTitle = title.replace(/\s+/g, "-"); // Ersetze Leerzeichen durch Bindestriche

      await supabase.from("diary_users_feed").insert([
        {
          author: author,
          title: title,
          description: text,
          creator: author,
          upvotes: 0,
          downvotes: 0,
          table: "diary_users_feed",
          total_votes: 0,
          pathId: `${formattedAuthor}-${formattedTitle}`,
          userId: userId
        },
      ]);

      setLoading(false);
      dispatch(filter("deine_posts"))
      router.push("/");
    } catch (error) {
      setLoading(false);
      console.error(error);
    } 
  };


  return (
    <div className={style ? styles.container_dark : styles.container}>
      {isLoggedIn && (
        <div className={styles.createPost_Wrapper}>
          <div className={styles.title_container}>
            <h1 className={styles.createPost_title}>
              ERSTELLE ENEN NEUEN POST
            </h1>
            <Link href={`/`} className={styles.goBack_link}>
              <FontAwesomeIcon
                icon={faHouse}
                className={styles.house_icon}
              ></FontAwesomeIcon>
            </Link>
          </div>
          <div className={styles.createPost_div}>
            <form className={styles.createPost_form} onSubmit={createPost}>
              <label className={styles.createPost_label}> Autor </label>
              <input
                type="text"
                placeholder="autor"
                className={style ? styles.createPost_input_dark : styles.createPost_input}
                value={author}
                onChange={(event) => setAuthor(event.currentTarget.value)}
              ></input>

              <label className={styles.createPost_label}> Title </label>
              <input
                type="text"
                placeholder="titel"
                className={style ? styles.createPost_input_dark : styles.createPost_input}
                value={title}
                onChange={(event) => setTitle(event.currentTarget.value)}
              ></input>

              <label className={styles.createPost_label}> Text </label>
              <textarea
                className={style ? styles.createPost_textarea_dark : styles.createPost_textarea}
                name="content"
                id="content"
                cols="30"
                rows="20"
                placeholder="text"
                value={text}
                onChange={(event) => setText(event.currentTarget.value)}
              />
              <button type="submit" className={styles.createPost_button}>
                {loading ? "POSTEN..." : "ERSTELLEN 🚀"}
              </button>
            </form>

            <div className={styles.webUser_container}>
              <WebUser />
            </div>
          </div>
        </div>
      )}

      {!isLoggedIn && <Start />}
    </div>
  );
};

export default NewPostForm;
