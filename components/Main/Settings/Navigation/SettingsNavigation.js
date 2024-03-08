import Link from "next/link";
import { useRouter } from "next/router";

//FONT AWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faRedditAlien } from "@fortawesome/free-brands-svg-icons";

//STYLES
import styles from "../../../../styles/Profile/Settings/SettingsNavigation.module.css";


//COMPONENTS
import SettingsNavigationWeb from './SettingsNavigationWeb'
import { current } from "@reduxjs/toolkit";


const SettingsNavigation = () => {
  const router = useRouter();


  //const currentPath = router.pathname.split("/")[3]; // Extrahiert den Wert aus dem Platzhalter
  const currentPath = router.asPath.split("/")[3]; // Extrahiert den Wert aus dem Platzhalter



  
  return (
    <div className={styles.settings_div}>
      <Link
        href="/profil/einstellungen/account"
        className={`${styles.settings_link} ${
          currentPath === "account" ? styles.active : "  "
        }`}
      >
        Konto
      </Link>
      <Link
        href="/profil/einstellungen/profil"
        className={`${styles.settings_link} ${
          currentPath === "profil" ? styles.active : ""
        }`}
      >
        Profil
      </Link>
      <Link
        href="/profil/einstellungen/sicherheit"
        className={`${styles.settings_link} ${
          currentPath === "security" ? styles.active : ""
        }`}
      >
        Sicherheit & Datenschutz
      </Link>

      <SettingsNavigationWeb />

      <Link href="/profile" className={styles.home_button}>
        <FontAwesomeIcon icon={faRedditAlien}></FontAwesomeIcon>
      </Link>

      <button className={styles.settings_links_mobile}>
        <FontAwesomeIcon icon={faBars} />
      </button>
    </div>
  );
};

export default SettingsNavigation;
