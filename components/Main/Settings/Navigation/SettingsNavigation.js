import Link from "next/link";
import { useRouter } from "next/router";

//FONT AWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faRedditAlien } from "@fortawesome/free-brands-svg-icons";

//STYLES
import styles from "../../../../styles/Profile/ProfileSettings.module.css";


//COMPONENTS
import SettingsNavigationMobile from './SettingsNavigationMobile'
import { current } from "@reduxjs/toolkit";


const SettingsNavigation = () => {
  const router = useRouter();

  console.log(router.pathname);
  //const currentPath = router.pathname.split("/")[3]; // Extrahiert den Wert aus dem Platzhalter
  const currentPath = router.asPath.split("/")[3]; // Extrahiert den Wert aus dem Platzhalter

  console.log(currentPath);

  
  return (
    <div className={styles.settings_div}>
      <Link
        href="/profile/settings/account"
        className={`${styles.settings_link} ${
          currentPath === "account" ? styles.active : "  "
        }`}
      >
        Konto
      </Link>
      <Link
        href="/profile/settings/profile"
        className={`${styles.settings_link} ${
          currentPath === "profile" ? styles.active : ""
        }`}
      >
     
        Profil
      </Link>
      <Link
        href="/profile/settings/security"
        className={`${styles.settings_link} ${
          currentPath === "security" ? styles.active : ""
        }`}
      >
        Sicherheit & Datenschutz
      </Link>

      <SettingsNavigationMobile />

      <Link href="/" className={styles.home_button}>
        <FontAwesomeIcon icon={faRedditAlien}></FontAwesomeIcon>
      </Link>

      <button className={styles.settings_links_mobile}>
        <FontAwesomeIcon icon={faBars} />
      </button>
    </div>
  );
};

export default SettingsNavigation;
