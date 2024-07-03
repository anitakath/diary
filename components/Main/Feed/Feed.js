import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
//COMPONENTS
import CreatePost from "./CreatePost";
import Post from "./Post";
import Filter from "./Filter";
import YourImgDiary from "../DIARY_COMPONENTS/ImagePosts/YourImgDiary";
import AnnesImgDiary from "../DIARY_COMPONENTS/ImagePosts/AnnesImgDiary";
import UsersPosts from "../DIARY_COMPONENTS/Posts/UsersPosts";
import AnnesPosts from "../DIARY_COMPONENTS/Posts/AnnesPosts";


//STYLES
import styles from "../../../styles/Main/Feed/Feed.module.css";
//REDUX
import { useSelector } from "react-redux";

//CUSTOM HOOKS
import { usePosts } from "@/hooks/usePosts";
import { useUser } from "@/hooks/useUser";


const Feed = (props) => {
  const currentFilter = useSelector((state) => state.filter);
  const { posts } = usePosts();
  const { userId } = useUser();

  const CDN_URL = process.env.CDN_URL;
  const CDN_URL_USERID = `${CDN_URL}${userId}`;
 

  const [loadedImages, setLoadedImages] = useState(false);

  useEffect(() => {
    if (posts) {
      setLoadedImages(true);
    }
  }, [posts]);



  return (
    <div className={styles.container}>
      <Filter />

      <CreatePost />
      {currentFilter.selectedFilter === "deine_posts" && (
        <UsersPosts posts={posts} />
      )}
      {currentFilter.selectedFilter === "annes_posts" && (
        <AnnesPosts posts={posts} />
      )}

      <div className={styles.post_div}>
        {loadedImages &&
          posts &&
          posts.length > 0 &&
          posts.map((post, index) => (
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
                pathId={post.pathId}
              />
            </div>
          ))}

        {currentFilter.selectedFilter === "deine_images" && (
          <YourImgDiary CDN_URL_USERID={CDN_URL_USERID} />
        )}

        {currentFilter.selectedFilter === "annes_images" && (
          <AnnesImgDiary CDN_URL_USERID={CDN_URL_USERID} />
        )}
      </div>
    </div>
  );
};

export default Feed;
