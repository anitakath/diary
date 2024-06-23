import Link from 'next/link';
import {  useState, useEffect } from 'react';
import Image from 'next/image';
//COMPONENTS
import Start from '@/components/Start';

//STYLE
import styles from '../../styles/Profile/ProfilePage.module.css'
//FONT AWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
//REDUX
import { useSelector } from 'react-redux';
import { useUser } from '@/hooks/useUser';

const Profile = () =>{

  const { isLoggedIn, currUser, nightMode } = useSelector((state) => ({
    isLoggedIn: state.auth.isLoggedIn,
    currUser: state.user,
    nightMode: state.toggle.isNightMode,
  }));


  const [style, setStyle] = useState(false);

  useEffect(() => {
    setStyle(nightMode);
  }, [nightMode]);


  const { currentGoogleUser, currentUser } = useUser();

  const [filteredUser, setFilteredUser] = useState({});

  const [fName_google, setFName] = useState('')
  const [lName_google, setLName] = useState("");
  const [email_google, setEmail] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("")



  useEffect(() => {
    if(currentGoogleUser){
      const fullName = currentGoogleUser.user.identities[0].identity_data.full_name;
      const firstName = fullName.substring(0, fullName.indexOf(" "));
      const lastName = fullName.substring(fullName.indexOf(" ") + 1);
      setFName(firstName);
      setLName(lastName)
      setEmail(currentGoogleUser.user.identities[0].email);
      setAvatarUrl(currentGoogleUser.user?.user_metadata?.avatar_url); 
    }
    

    if(currentUser){
      setFName(currentUser.name)
      setEmail(currentUser.email)
      setLName(currentUser.lastName)
      setAvatarUrl(currentUser.profileImage);

    } else{
      console.log('no pic')
    }
  
  }, [currentGoogleUser, currentUser])



  useEffect(()=>{

    const getUsers = async ()=>{
      const response = await fetch("/api/get-users");
      const data = await response.json(); // Wandelt die Response in ein JSON-Objekt um
      let filterUser;
      if(currentGoogleUser){
         filterUser = data.data.find((user) => user.email === currentGoogleUser.email);
      } else if(currentUser){
        filterUser = data.data.find((user) => user.email === currentUser.email )
      }

      if(filterUser){
        setFilteredUser(filterUser)
      } else{
        console.log('kein user gefunden')
      }
    }
    getUsers()

  }, [])





  return (
    <div>
      {!isLoggedIn && <Start />}

      {isLoggedIn && (
        <div className={nightMode ? styles.container_dark : styles.container}>
          <div className={styles.profile_container}>
            <h1 className={styles.title}>Profil</h1>

            <div className={styles.profile_div}>
              <div className={styles.usersData_div}>
                <div className={styles.image_div}>
                  <div
                    className={`${styles.image_wrapper} ${
                      style
                        ? styles.image_wrapper_dark
                        : styles.image_wrapper_light
                    }`}
                  >
                    <Image
                      alt="Foto des Users"
                      src={avatarUrl || "/placeholder.jpg"}
                      width={80}
                      height={200}
                      className={styles.users_image}
                      xw="true"
                      priority
                      unoptimized
                      crossOrigin="anonymous"
                    ></Image>
                    <Link
                      href="/profil/einstellungen"
                      className={styles.profileSettings_link}
                    >
                      <FontAwesomeIcon icon={faGear} className={styles.icon} />
                    </Link>
                  </div>
                </div>
                <h1 className={styles.userData_title}> Hey {fName_google} </h1>

                <h2 className={styles.userData_subtitle}>
                  Name:
                  <span className={styles.user_data_span}>
                    
                    {lName_google}
                  </span>
                </h2>
                <h2 className={styles.userData_subtitle}>
                  Vorname: 
                  <span className={styles.user_data_span}>
                     {fName_google}
                  </span>
                </h2>
                <h2 className={styles.userData_subtitle}>
                  E-Mail:
                  <span className={styles.user_data_span}>
                    {currUser.email} {email_google}
                  </span>
                </h2>
                <h2 className={styles.userData_subtitle}> Telefonnummer </h2>
                <h2 className={styles.userData_subtitle}>
                  Passwort
                  <span className={styles.user_data_span}> ********* </span>
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