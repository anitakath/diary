
import Link from "next/link";


import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

//CONTEXT
import { RedditContext } from "@/context/RedditContext";

//REDUX
import { useSelector, useDispatch } from "react-redux";
import { login } from "@/store/authSlice";

//COMPONENTS
import Menu from "./Menu";

import SearchBar from "../UI/SearchBar";

//STYLES
import styles from '../../styles/Header/Header.module.css'

//FONT AWESOME
import { faRedditAlien } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faUsers, faHouse } from "@fortawesome/free-solid-svg-icons";




const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isRegistered = useSelector((state) => state.auth.isRegistered);
  const nightMode = useSelector((state) => state.toggle.isNightMode);

  const { currentUser } = useContext(RedditContext);

  // Time-limited info for successful registration
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [loginSuccessMessage, setLoginSuccessmessage] = useState(false)


  useEffect(() => {

    if (isRegistered) {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 10000); // 10 Sekunden
    }


    if(isLoggedIn){
      setLoginSuccessmessage(true);
      setTimeout(() => {
        setLoginSuccessmessage(false);
      }, 10000); // 10 Sekunden
    }


    dispatch(login())
  }, [isRegistered, isLoggedIn]);



  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const menuHandler = () => {
    if (menuIsOpen === true) {
      setMenuIsOpen(false);
    } else if (menuIsOpen === false) {
      setMenuIsOpen(true);
    }
  };


   const navigateToHome = () => {
     router.push("/");
   };
  
   /*
  const reloadPage = () => {
    window.location.reload();
  };*/
  

  return (
    <div className={styles.container}>
      {isLoggedIn && (
        <div
          className={nightMode ? styles.container_dark : styles.container_light}
        >
          <div className={styles.title}>
            <FontAwesomeIcon
              icon={faRedditAlien}
              className={styles.icon}
              onClick={navigateToHome}
            />
          </div>

          <SearchBar />

          <div className={styles.login_container}>
            {isLoggedIn && (
              <div className={styles.login_container}>
                <button className={styles.userMenu_btn} onClick={menuHandler}>
                  <FontAwesomeIcon icon={faUser} className={styles.user} />
                  <p className={nightMode ? styles.dark_p : styles.light_p}>
                    menu
                  </p>
                </button>

                <button className={styles.userMenu_btn_web}>
                  <FontAwesomeIcon icon={faUsers} className={styles.user} />
                  <p className={nightMode ? styles.dark_p : styles.light_p}>
                    community
                  </p>
                </button>

                <button className={styles.userMenu_btn_web}>
                  <FontAwesomeIcon icon={faHouse} className={styles.user} />
                  <p className={nightMode ? styles.dark_p : styles.light_p}>
                    beitrag
                  </p>
                </button>
              </div>
            )}
          </div>

          {menuIsOpen && (
            <div
              className={
                nightMode ? styles.menu_backdrop_dark : styles.menu_backdrop
              }
              onClick={menuHandler}
            ></div>
          )}

          {menuIsOpen && <Menu setMenuIsOpen={setMenuIsOpen} />}
        </div>
      )}

      {!isLoggedIn && <h1 className={styles.login_callToAction}> </h1>}
    </div>
  );
};

export default Header;