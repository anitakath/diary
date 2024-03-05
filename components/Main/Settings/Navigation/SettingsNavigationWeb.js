import Link from "next/link"


//STYLES
import styles from "../../../../styles/Profile/Settings/SettingsNavigation.module.css";



const SettingsNavigationWeb = () =>{



    return (
      
      <div>
        <Link
          href="/profil/einstellungen/feed"
          className={styles.settings_link_web}
        >
          Feedeinstellungen
        </Link>
        <Link
          href="/profil/einstellungen/benachrichtigungen"
          className={styles.settings_link_web}
        >
          Benachrichtigungen
        </Link>
        <Link
          href="/profil/einstellungen/mails"
          className={styles.settings_link_web}
        >
          Mails
        </Link>
        <Link
          href="/profil/einstellungen/abos"
          className={styles.settings_link_web}
        >
          Abos
        </Link>
        <Link
          href="/profile/settings/chats"
          className={styles.settings_link_web}
        >
          Chats & Nachrichten
        </Link>
      </div>
    );
}

export default SettingsNavigationWeb