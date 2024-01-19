

import Link from "next/link";
import { supabase } from "@/services/supabaseClient";
import { useRouter } from "next/router";
//REDUX
import { logout } from "@/store/authSlice";
import { useDispatch, useSelector } from "react-redux";

//STYLE
import styles from '../../styles/Header/LoggedInMenu.module.css'


const LoggedInMenu = () => {

  const router = useRouter();


  const dispatch = useDispatch();


  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)


  const logoutHandler = async() =>{

   
  const {error} = await supabase.auth.signOut();

  if(error){
    console.error('Fehler Beim Abmelden:', error.message)
  } else{
    dispatch(logout());
    router.push('/')

  }

}


  return (
    <div className={styles.container}>
      <p> Profil </p>

      <Link href="/profile/settings"> Profileinstellungen </Link>

      <p> Nachtmodus </p>

      <button className={styles.logout_btn} onClick={logoutHandler}>
        abmelden
      </button>
    </div>
  );
};

export default LoggedInMenu;
