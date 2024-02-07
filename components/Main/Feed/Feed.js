
import { useState, useEffect } from "react";
import Image from "next/image";


//COMPONENTS
import CreatePost from "./CreatePost";
import Post from "./Post";
import Filter from './Filter'
import WebUser from "../WebUser";

//STYLES
import styles from '../../../styles/Main/Feed/Feed.module.css'

//REDUX 
import { useSelector } from "react-redux";
import { current } from "@reduxjs/toolkit";

const Feed = (props) => {


  const currentFilter = useSelector((state) => state.filter);


  const loadedPosts = props.posts;

  

  const [loadingPosts, setLoadingPosts] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [posts, setPosts] = useState([])
  const [ deine, setDeine ] = useState(false)
  

  useEffect(()=>{

    if(currentFilter === 'deine'){
      setDeine(true)
      setLoadingPosts(true)
    } else if (currentFilter != 'deine'){
      setDeine(false)
    }

      if (loadedPosts) {
        setIsLoaded(true);
        setPosts(loadedPosts)
        setLoadingPosts(false)
      }
     
   
  }, [props.posts, currentFilter]) 




  return (
    <div className={styles.container}>
      <Filter />

      <CreatePost />

      
    
        {loadingPosts && (
          <p className={styles.loadingPostsParagraph}> loading posts ...</p>
        )}
        {isLoaded &&
          deine &&
          posts.map((post, id) => (
            <div className={styles.post_container}>

            <Post {...post} key={id} />
            </div>
          ))}

        
      
    </div>
  );
};

export default Feed;
