

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


const Feed = (props) => {
  const currentFilter = useSelector((state) => state.filter);
  const loadedPosts = props.posts;



  const [loadingPosts, setLoadingPosts] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);


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



  const storedFilter =
    typeof window !== "undefined"
      ? localStorage.getItem("selectedFilter") || "beste"
      : "beste";

  useEffect(() => {
    if (loadedPosts) {
      setIsLoaded(true);
      setPosts(loadedPosts);
      setFilteredPosts(loadedPosts);
      setLoadingPosts(false);
    }
  }, [loadedPosts]);






      useEffect(() => {
        if (isLoaded) {
          // Filter the posts based on the selected filter
          const newFilteredPosts = loadedPosts.filter((post) => {
            // Implement your filter logic here based on currentFilter
            return true; // Placeholder logic for now
          });
          setFilteredPosts(newFilteredPosts);
        }
      }, [currentFilter]);



      console.log(loadedPosts)



  return (
    <div className={styles.container}>
      <Filter />

      <CreatePost />

      {loadingPosts && (
        <p className={styles.loadingPostsParagraph}> loading posts ...</p>
      )}
      <div className={styles.post_div}>
        {isLoaded &&
          loadedPosts &&
          loadedPosts.length > 0 &&
          loadedPosts.map((post, index) => (
            <div className={styles.post_container} key={index}>
              <Post
                post={post}
                id={post.id}
                author={props.author}
                created_at={post.created_at}
                table={post.table}
                description={post.description}
                downvotes={post.downvotes}
                title={post.title}
                upvotes={post.upvotes}
                currentGoogleUserId={props.currentGoogleUserId}
              />
            </div>
          ))}

        {loadedPosts === null &&  (
          <div className={styles.noLoadedPosts_div}>
           <p>  hier gibt es noch keine Posts 🥲 </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
