import Link from "next/link"


//STYLES
import styles from "../../../../styles/Profile/ProfileSettings.module.css";



const SettingsNavigationMobile = () =>{


    return (
      <div>
        <Link
          href="/profile/settings/account"
          className={styles.settings_link_web}
        >
          Feedeinstellungen
        </Link>
        <Link
          href="/profile/settings/account"
          className={styles.settings_link_web}
        >
          Benachrichtigungen
        </Link>
        <Link
          href="/profile/settings/account"
          className={styles.settings_link_web}
        >
          Mails
        </Link>
        <Link
          href="/profile/settings/account"
          className={styles.settings_link_web}
        >
          Abos
        </Link>
        <Link
          href="/profile/settings/account"
          className={styles.settings_link_web}
        >
          Chats & Nachrichten
        </Link>
      </div>
    );
}

export default SettingsNavigationMobile