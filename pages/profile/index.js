import Link from 'next/link';

//COMPONENTS
import Start from '@/components/Start';
import SettingsComponent from "@/components/Main/Settings/Settings";


//STYLE
import styles from '../../styles/Profile/ProfilePage.module.css'

//FONT AWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

//REDUX
import { useSelector } from 'react-redux';

const Profile = () =>{

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const nightMode = useSelector((state)=> state.toggle)

  console.log(isLoggedIn)

    return (
      <div>
        {!isLoggedIn && <Start />}

        {isLoggedIn && (
          <div className={nightMode ? styles.container_dark : styles.container}>
            <div className={styles.profile_container}>
              <Link href="/profile/settings" className={styles.profileSettings_link}>
                <FontAwesomeIcon icon={faGear} />
              </Link>

              <h1 className={styles.title}> Profil </h1>


              <div className={styles.profile_div}>
              
              </div>
            </div>
          </div>
        )}
      </div>
    );
}

export default Profile;