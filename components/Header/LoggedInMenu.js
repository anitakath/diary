

import Link from "next/link";
import { supabase } from "@/services/supabaseClient";
import { useRouter } from "next/router";


//REDUX
import { logout } from "@/store/authSlice";
import { useDispatch, useSelector } from "react-redux";


//STYLE
import styles from '../../styles/Header/LoggedInMenu.module.css'

//UI
import Slider from "../UI/Slider";

const LoggedInMenu = () => {

  const router = useRouter();


  const dispatch = useDispatch();


  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

  const nightMode = useSelector((state) => state.toggle)

  console.log(nightMode)
  

   const activeLinkStyle = {
     fontWeight: "bold", // Hier kannst du das Styling für den aktiven Link anpassen
     color: " #F7567C", // Zum Beispiel die Schriftfarbe ändern
   };


  const logoutHandler = async () =>{

    const {error} = await supabase.auth.signOut();

    if(error){
      console.error('Fehler Beim Abmelden:', error.message)
    } else{
      dispatch(logout());
      router.push('/')
    }

  }



  

 


  return (
    <div className={`${styles.container} ${nightMode ? styles.container_dark : styles.container_light}`}>
      <Link href="/" style={router.pathname === "/" ? activeLinkStyle : null}>
        {" "}
        Startseite{" "}
      </Link>

      <Link
        href="/profile/settings"
        style={router.pathname === "/profile/settings" ? activeLinkStyle : null}
      >
        {" "}
        Profileinstellungen{" "}
      </Link>

      <Link
        href="/profile"
        style={router.pathname === "/profile" ? activeLinkStyle : null}
      >
        {" "}
        Profil
      </Link>

      <div className={styles.toggle_div}>
        <p> Nachtmodus </p>
        <Slider />
      </div>

      <button className={styles.logout_btn} onClick={logoutHandler}>
        abmelden
      </button>
    </div>
  );
};

export default LoggedInMenu;
