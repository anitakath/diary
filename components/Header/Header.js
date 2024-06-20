
import Link from "next/link";


import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

//CONTEXT
import { RedditContext } from "@/context/RedditContext";

//REDUX
import { useSelector, useDispatch } from "react-redux";

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
  const [style, setStyle] = useState(false)

  // Time-limited info for successful registration
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [loginSuccessMessage, setLoginSuccessmessage] = useState(false);

  // ------------------  NIGHT / DAY MODE TOGGLE ----------------------


  useEffect(() => {
    if(nightMode){
      console.log('header dark mode on')
      setStyle(true);
    } else {
      console.log("header dark mode off");
      setStyle(false)
    }
    
  }, [nightMode]);

  console.log(style)
  console.log(nightMode)


  useEffect(() => {
    if (isRegistered) {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 10000); // 10 Sekunden
    }

    if (isLoggedIn) {
      setLoginSuccessmessage(true);
      setTimeout(() => {
        setLoginSuccessmessage(false);
      }, 10000); // 10 Sekunden
    }
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

  console.log('IS LOGGED IN?')
  console.log(isLoggedIn)


  return (
    <div className={styles.container}>
     {isLoggedIn && (
        <div className={style ? styles.container_dark : styles.container_light}>
          <SearchBar />

          <div className={styles.login_container}>
            {isLoggedIn && (
              <div className={styles.login_container}>
                <button className={styles.userMenu_btn} onClick={menuHandler}>
                  <FontAwesomeIcon icon={faUser} className={styles.user} />
                  <p className={style ? styles.dark_p : styles.light_p}>menu</p>
                </button>

                <button className={styles.userMenu_btn_web}>
                  <FontAwesomeIcon icon={faUsers} className={styles.user} />
                  <p className={style ? styles.dark_p : styles.light_p}>
                    community
                  </p>
                </button>

                <Link href="/" className={styles.userMenu_btn_web}>
                  <FontAwesomeIcon icon={faHouse} className={styles.user} />
                  <p className={style ? styles.dark_p : styles.light_p}>
                    Startseite
                  </p>
                </Link>
              </div>
            )}
          </div>

          {menuIsOpen && (
            <div
              className={
                style ? styles.menu_backdrop_dark : styles.menu_backdrop
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