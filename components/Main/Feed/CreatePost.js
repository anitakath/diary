import Link from 'next/link';
import Image from 'next/image';


import { useContext, useEffect, useState } from 'react';


//CONTEXT
import { RedditContext } from "@/context/RedditContext";
//STYLES
import styles from '../../../styles/Main/Feed/CreatePost.module.css'
//FONT AWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import {  faMessage } from "@fortawesome/free-solid-svg-icons";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
//REDUX
import { useSelector } from 'react-redux';
import { useUser } from "@/hooks/useUser";

const CreatePost = () => {

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { currentGoogleUser } = useUser()

  const currentFilter = useSelector((state) => state.filter.selectedFilter);
  const [avatarUrl, setAvatarUrl] = useState('')


  useEffect(()=>{
    if (currentGoogleUser) {
      setAvatarUrl(currentGoogleUser.user?.user_metadata?.avatar_url);
    }
  }, [])
  




  return (
    <div className={styles.createPost_container}>
      <div className={styles.userImage_container}>
        {isLoggedIn ? (
          <Image
            alt="foto des Users"
            src={avatarUrl || "/placeholder.jpg"}
            width={80}
            height={200}
            className={styles.users_image}
            xw="true"
            priority
          ></Image>
        ) : (
          <FontAwesomeIcon icon={faQuestion} className={styles.icon} />
        )}
      </div>

      <div className={styles.form_container}>
        <div className={styles.createPost_linkDiv}>
          {currentFilter === "deine_posts" && (
            <Link href={`/neuer-post`} className={styles.photo_btn}>
              <FontAwesomeIcon icon={faMessage} className={styles.icon} />

              <span>neuen Beitrag</span>
            </Link>
          )}

          {currentFilter === "deine_images" && (
            <Link href={`/neuer-bildeintrag`} className={styles.photo_btn}>
              <FontAwesomeIcon
                icon={faImage}
                className={styles.icon}
              />
              <span> neuen Tagebucheintrag </span>
            </Link>
          )}

          {currentFilter === "annes_images" && (
            <Link href={`/profil`} className={styles.anne_profile_link}>
              Profil von Anne einsehen
            </Link>
          )}

          {currentFilter === "annes_posts" && (
            <Link href={`/profil`} className={styles.anne_profile_link}>
              Profil von Anne einsehen
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
