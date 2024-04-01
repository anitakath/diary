import { useState, useEffect, memo } from "react";


//COMPONENTS
import Feed from "./Feed/Feed";
import WebUser from "./WebUser";
import Login from "../Start";


//STYLES
import styles from '../../styles/Main/Main.module.css'

//REDUX
import { useSelector, useDispatch } from 'react-redux'




const Main = (props) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const nightMode = useSelector((state) => state.toggle.isNightMode);
  const [style, setStyle] = useState(false)

  const  addNewPost = props.addNewPost

    useEffect(() => {
      setStyle(nightMode);
    }, [nightMode]);


    
  return (
    <div className={style ? styles.container_dark : styles.container}>
      {!isLoggedIn && <Login />}

      {isLoggedIn && (
        <div className={styles.main_container}>
          <div className={styles.output_field}>
            <Feed
    
              addNewPost={addNewPost}
              posts={props.posts}
              currentGoogleUserId={props.currentGoogleUserId}
            />
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