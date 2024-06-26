

import Link from "next/link";
import { supabase } from "@/services/supabaseClient";
import { useRouter } from "next/router";


//REDUX
import { logout } from "@/store/authSlice";
import { useDispatch, useSelector } from "react-redux";


//STYLE
import styles from '../../styles/Header/Menu.module.css'

//UI
import Slider from "../UI/Slider";


//COMPONENTS
import FilterMobile from "../Main/Feed/MOBILE_FILTER/FilterMobile";

import { setCurrentGoogleUser, setCurrentUser } from "@/store/userSlice";



const Menu = (props) => {

  const router = useRouter();


  const dispatch = useDispatch();


  const nightMode = useSelector((state) => state.toggle.isNightMode)
  

   const activeLinkStyle = {
     fontWeight: "bold", // Hier kannst du das Styling für den aktiven Link anpassen
     color: " #F7567C", // Zum Beispiel die Schriftfarbe ändern
   };


  const logoutHandler = async () =>{
    const {error} = await supabase.auth.signOut();

    console.log(error)

    if(error){
      console.error('Fehler Beim Abmelden:', error.message)
    } else{
      //dispatch(toggle())

      if (setCurrentUser){
        console.log('logging out the current email user')
        dispatch(setCurrentUser(null));
      } 
      
      dispatch(logout());

      localStorage.setItem("isNightMode", false);
      localStorage.setItem("isLoggedIn", false);
      router.push('/')
      window.location.reload();
    }
  }




  const setMenuIsOpen = props.setMenuIsOpen

  const closeModalHandler = () =>{
    setMenuIsOpen(false)
  }



  

 


  return (
    <div className={`${styles.container} ${nightMode ? styles.container_dark : styles.container_light}`}>
      
      <button className={styles.closeMenu_btn} onClick={closeModalHandler}>  
        <h1> X </h1>
      </button>
      
      <Link href="/" style={router.pathname === "/" ? activeLinkStyle : null}>
        Startseite
      </Link>

      <Link
        href="/profil/einstellungen"
        style={router.pathname === "/profil/einstellungen" ? activeLinkStyle : null}
      >
        Profileinstellungen
      </Link>

      <Link
        href="/profil"
        style={router.pathname === "/profile" ? activeLinkStyle : null}
      >
        Profil
      </Link>

      <div className={styles.toggle_div}>
        <p> Nachtmodus </p>
        <Slider />
      </div>

      <button className={styles.logout_btn} onClick={logoutHandler}>
        abmelden
      </button>

      <FilterMobile/>
    </div>
  );
};

export default Menu;
