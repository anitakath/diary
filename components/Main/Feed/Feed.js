import React from "react";
import { useState, useEffect } from "react";
//COMPONENTS
import CreatePost from "./CreatePost";
import Filter from "./Filter";
import YourImgDiary from "../DIARY_COMPONENTS/ImagePosts/YourImgDiary";
import AnnesImgDiary from "../DIARY_COMPONENTS/ImagePosts/AnnesImgDiary";
import Community from "../DIARY_COMPONENTS/Community/Community";
import Posts from "../DIARY_COMPONENTS/Posts/Posts";
//STYLES
import styles from "../../../styles/Main/Feed/Feed.module.css";
//REDUX
import { useSelector } from "react-redux";
//CUSTOM HOOKS
import { usePosts } from "@/hooks/usePosts";
import { useUser } from "@/hooks/useUser";
import { current } from "@reduxjs/toolkit";

const Feed = (props) => {
  const currentFilter = useSelector((state) => state.filter.selectedFilter);
  const { posts } = usePosts();
  const { userId } = useUser();
  const CDN_URL = process.env.CDN_URL;
  const CDN_URL_USERID = `${CDN_URL}${userId}`;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (posts) {
      setIsLoaded(true);
    }
  }, [posts]);



  return (
    <div className={styles.container}>
      <Filter />

      <CreatePost />

      <div className={styles.post_div}>
        {currentFilter === "community" && (
        <Community posts={posts}/>
        )}


        {(currentFilter === "deine_posts" ||
          currentFilter === "annes_posts") && (
          <Posts posts={posts} isLoaded={isLoaded} />
        )}

        {currentFilter === "deine_images" && (
          <YourImgDiary CDN_URL_USERID={CDN_URL_USERID} />
        )}

        {currentFilter === "annes_images" && (
          <AnnesImgDiary CDN_URL_USERID={CDN_URL_USERID} />
        )}
      </div>
    </div>
  );
};

export default Feed;
