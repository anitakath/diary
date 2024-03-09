import Link from "next/link"


//STYLES
import styles from "../../../../styles/Profile/Settings/SettingsNavigation.module.css";



const MobileNavigation = () =>{



    return (
      <ul className={styles.mobileNavigation_div}>
        <li className={styles.settings_link_mobile}>
          <Link href="/profil/einstellungen/feed">Feedeinstellungen</Link>
        </li>
        <li className={styles.settings_link_mobile}>
          <Link href="/profil/einstellungen/benachrichtigungen">
            Benachrichtigungen
          </Link>
        </li>
        <li className={styles.settings_link_mobile}>
          <Link href="/profil/einstellungen/mails">Mails</Link>
        </li>
        <li className={styles.settings_link_mobile}>
          <Link href="/profil/einstellungen/abos">Abos</Link>
        </li>
      
      </ul>
    );
}

export default MobileNavigation;