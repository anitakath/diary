import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

//FONT AWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faRedditAlien } from "@fortawesome/free-brands-svg-icons";

//STYLES
import styles from "../../../../styles/Profile/Settings/SettingsNavigation.module.css";


//COMPONENTS

import MobileNavigation from "./MobileNavigation";
import { current } from "@reduxjs/toolkit";


const SettingsNavigation = () => {
  const router = useRouter();


  //const currentPath = router.pathname.split("/")[3]; // Extrahiert den Wert aus dem Platzhalter
  const currentPath = router.asPath.split("/")[3]; // Extrahiert den Wert aus dem Platzhalter


  const [ isMobileNavOpen, setIsMobileNav ] = useState(false)


  const mobileNavHandler = () =>{
    setIsMobileNav(!isMobileNavOpen)
  }

  
  return (
    <div className={styles.settings_div}>
      <ul className={styles.navigation_div}>
        <li
          className={`${styles.settings_link} ${
            currentPath === "account" ? styles.active : ""
          }`}
        >
          <Link href="/profil/einstellungen/account">Konto</Link>
        </li>
        <li
          className={`${styles.settings_link} ${
            currentPath === "profil" ? styles.active : ""
          }`}
        >
          <Link href="/profil/einstellungen/profil">Profil</Link>
        </li>
        <li
          className={`${styles.settings_link} ${
            currentPath === "security" ? styles.active : ""
          }`}
        >
          <Link href="/profil/einstellungen/sicherheit">
            Sicherheit
          </Link>
        </li>

        <button className={styles.webNavigation_btn} onClick={mobileNavHandler}>
          ...
        </button>
      </ul>

      {isMobileNavOpen && <MobileNavigation />}

      <div className={styles.icon_container}>
        <Link href="/profil" className={styles.profile_button}>
          <FontAwesomeIcon icon={faRedditAlien}></FontAwesomeIcon>
          <p> Profil</p>
        </Link>
      </div>
    </div>
  );
};

export default SettingsNavigation;
