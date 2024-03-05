

import React from 'react';
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

const Feed = React.memo((props) => {
  const currentFilter = useSelector((state) => state.filter);
  const loadedPosts = props.posts;


   const nightMode = useSelector((state) => state.toggle.isNightMode);

   console.log(nightMode)
  

  //console.log(props.posts)

  const [loadingPosts, setLoadingPosts] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [posts, setPosts] = useState([]);

  const {
    id,
    created_at,
    content,
    author,
    title,
    description,
    upvotes,
    downvotes,
  } = props;

  let totalvote = upvotes - downvotes;

  const storedFilter =
    typeof window !== "undefined"
      ? localStorage.getItem("selectedFilter") || "beste"
      : "beste";

  useEffect(() => {
    if (loadedPosts) {
      setIsLoaded(true);
      setPosts(loadedPosts);
      setLoadingPosts(false);
    }
  }, [props.posts, currentFilter]);

  return (
    <div className={styles.container}>
      <Filter />

      <CreatePost />

      {loadingPosts && (
        <p className={styles.loadingPostsParagraph}> loading posts ...</p>
      )}
      {isLoaded &&
        currentFilter.selectedFilter === "deine" &&
        posts.map((post, id) => (
          <div className={styles.post_container}>
            <Post
              {...post}
              key={id}
              currentGoogleUserId={props.currentGoogleUserId}
            />
          </div>
        ))}
    </div>
  );
});

export default Feed;
