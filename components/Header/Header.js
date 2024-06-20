
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
//REDUX
import { useSelector} from "react-redux";
//COMPONENTS
import Menu from "./Menu";
import SearchBar from "../UI/SearchBar";
//STYLES
import styles from '../../styles/Header/Header.module.css'
//FONT AWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faUsers, faHouse } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const router = useRouter();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  //const isRegistered = useSelector((state) => state.auth.isRegistered);
  const nightMode = useSelector((state) => state.toggle.isNightMode);
  const [style, setStyle] = useState(false);

  // Time-limited info for successful login - so far not in use
  //
  const [loginSuccessMessage, setLoginSuccessmessage] = useState(false);



  // Toggle night/day mode
  useEffect(() => {
    setStyle(nightMode);
  }, [nightMode]);

  // Show success message for login - so far not in use 
  useEffect(() => {
    if (isLoggedIn) {
      setLoginSuccessmessage(true);
      setTimeout(() => {
        setLoginSuccessmessage(false);
      }, 10000); // 10 Sekunden
    }
  }, [isLoggedIn]);

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const menuHandler = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  const navigateToHome = () => {
    router.push("/");
  };

  return (
    <div className={isLoggedIn ? styles.container : ''}>
        {loginSuccessMessage && <p className={styles.login_success_p}> LOGGED IN ✔️ </p>}
      {isLoggedIn && (
        <div className={style ? styles.container_dark : styles.container_light}>
          <SearchBar />
          <div className={styles.login_container}>
            <button className={styles.userMenu_btn} onClick={menuHandler}>
              <FontAwesomeIcon icon={faUser} className={styles.user} />
              <p className={style ? styles.dark_p : styles.light_p}>menu</p>
            </button>
            <button className={styles.userMenu_btn_web}>
              <FontAwesomeIcon icon={faUsers} className={styles.user} />
              <p className={style ? styles.dark_p : styles.light_p}>
                {" "}
                community{" "}
              </p>
            </button>
            <Link href="/" className={styles.userMenu_btn_web}>
              <FontAwesomeIcon icon={faHouse} className={styles.user} />
              <p className={style ? styles.dark_p : styles.light_p}>
                {" "}
                Startseite{" "}
              </p>
            </Link>
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