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

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const nightMode = useSelector((state) => state.toggle.isNightMode);
  const [style, setStyle] = useState(false)

  const  addNewPost = props.addNewPost

    useEffect(() => {
      setStyle(nightMode);
    }, [nightMode]);

    console.log(isLoggedIn);

    let loggedIn;
    if (typeof localStorage !== "undefined") {
      loggedIn = localStorage.getItem("isLoggedIn");
      // Use loggedIn variable here
    } else {
      // Handle the case where localStorage is not available
    }

    console.log(loggedIn)
 

  // console.log(loggedIn);
   
    /*
  useEffect(() => {
    const isLoggedInLocalStorage = localStorage.getItem("isLoggedIn");
    if (isLoggedInLocalStorage === "true") {
      dispatch(login());
    }
  }, [dispatch]);*/

  console.log(isLoggedIn)
    
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