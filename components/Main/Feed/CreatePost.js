import Link from 'next/link';
import Image from 'next/image';


import { useContext, useState } from 'react';


//CONTEXT
import { RedditContext } from "@/context/RedditContext";


//STYLES
import styles from '../../../styles/Main/Feed/CreatePost.module.css'

//FONT AWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";


//REDUX
import { useSelector } from 'react-redux';


const CreatePost = () => {

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { currentGoogleUser } = useContext(RedditContext);
  const nightMode = useSelector((state) => state.toggle.isNightMode);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentFilter = useSelector((state) => state.filter.selectedFilter);



 const openModal = () => {
   setIsModalOpen(true);
 };


  let avatarUrl;

  if (currentGoogleUser) {

    //avatarUrl = '"' + (currentUser.user?.user_metadata?.avatar_url || '') + '"';
    avatarUrl = currentGoogleUser.user?.user_metadata?.avatar_url; // Zugriff auf das Profilfoto

   
  }




  return (
    <div className={styles.createPost_container}>
      <div className={styles.userImage_container}>
        <div className={styles.circle}>
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
      </div>

      <div className={styles.form_container}>
        <div className={styles.createPost_linkDiv}>
          {currentFilter === "deine_posts" && (
            <Link href={`/new-post`} className={styles.createPost_link}>
               neuen Beitrag
            </Link>
          )}

          {currentFilter === "deine_images" && (
            <Link href={`/new-image`} className={styles.photo_btn}>
              <FontAwesomeIcon
                icon={faImage}
                onClick={openModal}
                className={styles.icon}
              />
              <span> neuen Tagebucheintrag </span>
            </Link>
          )}

          {currentFilter === "annes_images" && (
            <Link href={`/profil`} className={styles.photo_btn}>
              <FontAwesomeIcon
                icon={faImage}
                onClick={openModal}
                className={styles.icon}
              />
              <span> Profil von Anne einsehen </span>
            </Link>
          )}
        </div>
      </div>

     
    </div>
  );
};

export default CreatePost;
