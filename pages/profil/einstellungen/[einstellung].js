
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

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
    const { einstellung } = router.query;


    const nightMode = useSelector((state) => state.toggle.isNightMode);
    const [style, setStyle] = useState(false);

    useEffect(() => {
      setStyle(nightMode);
    }, [nightMode]);



    const renderSelectedComponent = () => {
        switch (einstellung) {
          case "account":
            return <AccountSettings />;
          case "profil":
            return <ProfileSettings />;
          case "sicherheit":
            return <SecuritySettings />;
          // ... Weitere Fälle für andere Einstellungs-Komponenten
          default:
            return null;
        }
    }

    

    return (
      <div>
        <div className={style ? styles.container_dark : styles.container}>

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