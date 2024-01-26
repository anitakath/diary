import Link from "next/link";

//FONT AWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faRedditAlien } from "@fortawesome/free-brands-svg-icons";

//STYLES
import styles from "../../../../styles/Profile/ProfileSettings.module.css";


//COMPONENTS
import SettingsNavigationMobile from './SettingsNavigationMobile'


const SettingsNavigation = () => {
  return (
    <div className={styles.settings_div}>
      <Link href="/profile/settings/account" className={styles.settings_link}>
        {" "}
        Konto{" "}
      </Link>
      <Link href="/profile/settings/profile" className={styles.settings_link}>
        {" "}
        Profil{" "}
      </Link>
      <Link href="/profile/settings/security" className={styles.settings_link}>
        {" "}
        Sicherheit & Datenschutz{" "}
      </Link>




      <SettingsNavigationMobile/>




      

      <Link href="/" className={styles.home_button}>
        <FontAwesomeIcon icon={faRedditAlien}></FontAwesomeIcon>
      </Link>

      <button className={styles.settings_links_mobile}>
        <FontAwesomeIcon icon={faBars} />{" "}
      </button>
    </div>
  );
};

export default SettingsNavigation;
