
//COMPONENTS
import Feed from "./Feed/Feed";
import WebUser from "./WebUser";
import Login from "../Start";

//STYLES
import styles from "../../styles/Main/Main.module.css";
//REDUX
import { useSelector } from "react-redux";
//HOOKS
import { useNightMode } from "@/hooks/usenightMode";

const Main = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { style } = useNightMode();



  return (
    <div className={style ? styles.container_dark : styles.container}>
      {!isLoggedIn && <Login />}

      {isLoggedIn && (
        <div className={styles.main_container}>
          <div className={styles.output_field}>
            <Feed />
          </div>
          <div className={styles.webUser_div}>
            <WebUser />
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
