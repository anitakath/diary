

//COMPONENTS
import Start from '@/components/Start';
import SettingsComponent from "@/components/Main/Settings/Settings";


//STYLE
import styles from '../../styles/Profile/Profile.module.css'



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
              <h1> Profil </h1>
            </div>
          </div>
        )}
      </div>
    );
}

export default Profile;