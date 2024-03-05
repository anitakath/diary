import Link from 'next/link';
import { useContext, useState, useEffect } from 'react';
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
import { filter } from '@/store/filterSlice';

const Profile = () =>{

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const nightMode = useSelector((state)=> state.toggle.isNightMode)
  const currUser = useSelector((state) => state.user)

  console.log(currUser.email);

  const { currentGoogleUser } = useContext(RedditContext);



  const [fName_google, setFName] = useState('')
  const [lName_google, setLName] = useState("");
  const [email_google, setEmail] = useState("")




  useEffect(() => {
    if(currentGoogleUser){

      const fullName = currentGoogleUser.user.identities[0].identity_data.full_name;

      const firstName = fullName.substring(0, fullName.indexOf(" "));
      const lastName = fullName.substring(fullName.indexOf(" ") + 1);

      setFName(firstName);
      setLName(lastName)
      setEmail(currentGoogleUser.user.identities[0].email);
    }
  
  }, [currentGoogleUser])



  useEffect(()=>{

    const getUsers = async ()=>{
      const response = await fetch("/api/get-users");

      
      const data = await response.json(); // Wandelt die Response in ein JSON-Objekt um
      console.log(data.data); // Gibt das JSON-Objekt mit den Benutzerdaten in der Konsole aus

      const filterUser = data.data.find(user => user.email === currUser.email)

      if(filterUser){
        console.log(filterUser)
        setFilteredUser(filterUser)
      } else{
        console.log('kein user gefunden')
      }
    }

    getUsers()


  }, [])


  const [filteredUser, setFilteredUser] = useState({})


  console.log(filteredUser);



  let avatarUrl;

  if (currentGoogleUser) {
    //avatarUrl = '"' + (currentUser.user?.user_metadata?.avatar_url || '') + '"';
    avatarUrl = currentGoogleUser.user?.user_metadata?.avatar_url; // Zugriff auf das Profilfoto
  } else {
    avatarUrl = filteredUser.profileImage;
  }

  console.log(avatarUrl)

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
              <FontAwesomeIcon icon={faGear} className={styles.icon} />
            </Link>

            <h1 className={styles.title}> Profil </h1>

            <div className={styles.profile_div}>
              <div className={styles.image_div}>
                <div
                  className={`${styles.image_wrapper} ${
                    nightMode
                      ? styles.image_wrapper_dark
                      : styles.image_wrapper_light
                  }`}
                >
                  <Image
                    alt="Foto des Users"
                    src={avatarUrl}
                    width={80}
                    height={200}
                    className={styles.users_image}
                  ></Image>
                </div>
              </div>

              <div className={styles.usersData_div}>
                <h1 className={styles.userData_title}> Hey {fName_google} </h1>

                <h2 className={styles.userData_subtitle}>
                  Name:
                  <span>
                    {currUser.name} {filteredUser.name}
                    {lName_google}
                  </span>
                </h2>
                <h2 className={styles.userData_subtitle}>
                  Vorname: <span> {currUser.name}  {fName_google} </span>
                </h2>
                <h2 className={styles.userData_subtitle}>
                  E-Mail:
                  <span>
                    {currUser.email} {email_google}
                  </span>
                </h2>
                <h2 className={styles.userData_subtitle}> Telefonnummer </h2>
                <h2 className={styles.userData_subtitle}>
                  Passwort
                  <span> ********* </span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;