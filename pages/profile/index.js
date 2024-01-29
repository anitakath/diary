import Link from 'next/link';
import { useContext } from 'react';
import Image from 'next/image';

//COMPONENTS
import Start from '@/components/Start';
import SettingsComponent from "@/components/Main/Settings/Settings";

//CONTEXT
import { RedditContext } from "@/context/RedditContext";

//STYLE
import styles from '../../styles/Profile/ProfilePage.module.css'

//FONT AWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

//REDUX
import { useSelector } from 'react-redux';
import { current } from '@reduxjs/toolkit';

const Profile = () =>{

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const nightMode = useSelector((state)=> state.toggle)

  const { currentUser } = useContext(RedditContext);

  console.log(isLoggedIn)


  console.log(currentUser)

  let avatarUrl;

  if (currentUser) {
    //avatarUrl = '"' + (currentUser.user?.user_metadata?.avatar_url || '') + '"';
    avatarUrl = currentUser.user?.user_metadata?.avatar_url; // Zugriff auf das Profilfoto
  }

  return (
    <div>
      {!isLoggedIn && <Start />}

      {isLoggedIn && (
        <div className={nightMode ? styles.container_dark : styles.container}>
          <div className={styles.profile_container}>
            <Link
              href="/profile/settings"
              className={styles.profileSettings_link}
            >
              <FontAwesomeIcon icon={faGear} />
            </Link>

            <h1 className={styles.title}> Profil </h1>

            <div className={styles.profile_div}>
              
              <div className={styles.image_div}>
                <div className={styles.image_wrapper}>
                  <Image
                    alt="foto des Users"
                    src={avatarUrl}
                    width={80}
                    height={200}
                    className={styles.users_image}
                  ></Image>
                </div>
              </div>

              <div className={styles.usersData_div}>
                <h1 className={styles.userData_title}>users data div</h1>

                <h2> Name </h2>
                <h2> Vorname </h2>
                <h2> E-Mail </h2>
                <h2> Telefonnummer </h2>
                <h2> Passwort </h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;