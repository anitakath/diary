import { useState, useEffect } from "react";


//COMPONENTS
import Feed from "./Feed/Feed";
import WebUser from "./WebUser";
import Login from "../Start";


//STYLES
import styles from '../../styles/Main/Main.module.css'

//REDUX
import { useSelector, useDispatch } from 'react-redux'


const Main = (props) => {
  const [posts, setPosts] = useState([]);

  const currentFilter = useSelector((state) => state.filter);
  const nightMode = useSelector((state) => state.toggle)





  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)







 

  return (
    <div className={nightMode ? styles.container_dark : styles.container}>
      {!isLoggedIn && <Login />}

      {isLoggedIn && (
        <div className={styles.main_container}>
          
          <div className={styles.output_field}>
            <Feed posts={props.posts} />
          </div>
          <WebUser />
        
        </div>
      )}
    </div>
  );
};

export default Main; 