


import styles from "../../../styles/Profile/ProfileSettings.module.css";


//COMPONENTS
import WebUser from "../WebUser";


const ProfileSettings = () => {

  return (
      <div className={styles.profile_wrapper}>
        <div className={styles.settings_wrapper}>
          <h1 className={styles.title}> Profileinstellungen </h1>

          <div className={styles.ProfileSettings_div}>
            <h1 className={styles.setting_title}> Lorem Ipsum </h1>
            <p className={styles.setting_paragraph}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
              dolor sit amet.
            </p>
          </div>

          <div className={styles.ProfileSettings_div}>
            <h1 className={styles.setting_title}> Lorem Ipsum </h1>
            <p className={styles.setting_paragraph}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. 
            </p>
          </div>
        </div>

        <WebUser />
      </div>
  );
};

export default ProfileSettings;