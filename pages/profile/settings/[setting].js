
import Link from "next/link";
import { useRouter } from "next/router";


//COMPONENTS
import SettingsNavigation from "@/components/Main/Settings/Navigation/SettingsNavigation";
import AccountSettings from "@/components/Main/Settings/AccountSettings";
import ProfileSettings from "@/components/Main/Settings/ProfileSettings";
import SecuritySettings from "@/components/Main/Settings/SecuritySettings";

//FONT AWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faRedditAlien } from "@fortawesome/free-brands-svg-icons";


//STYLES
import styles from '../../../styles/Profile/ProfileSettings.module.css'

//REDUX
import { useSelector } from "react-redux";

const SettingPage = () =>{

    const router = useRouter();
    const { setting } = router.query;

    const renderSelectedComponent = () => {
        switch(setting) {
        case 'account':
            return <AccountSettings />;
        case 'profile':
            return <ProfileSettings />;
        case 'security':
            return <SecuritySettings />;
        // ... Weitere Fälle für andere Einstellungs-Komponenten
        default:
            return null;
        }
    }

      const nightMode = useSelector((state) => state.toggle.isNightMode);

    return (
      <div>
        <div className={nightMode ? styles.container_dark : styles.container}>
          <h1 className={styles.settings_title}> Nutzereinstellungen </h1>
          <SettingsNavigation />
          <div className={styles.settings_output_container}>
            {renderSelectedComponent()}
          </div>
        </div>
      </div>
    );
}

export default SettingPage