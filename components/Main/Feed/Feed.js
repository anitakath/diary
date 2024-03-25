

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
import { supabase } from '@/services/supabaseClient';


const Feed = (props) => {
  const currentFilter = useSelector((state) => state.filter);
  const loadedPosts = props.posts;



  const userId = props.currentGoogleUserId;



  const CDN_URL = process.env.CDN_URL;

  const CDN_URL_USERID = `${CDN_URL}${userId}`;


  const [loadingPosts, setLoadingPosts] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [images, setImages] = useState([]);
  const [loadedImages, setLoadedImages] = useState(false)

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

  const supabaseImages = useSelector((state) => state.images.images);


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
    if (isLoaded && loadedPosts) {
      // Filter the posts based on the selected filter
      const newFilteredPosts = loadedPosts.filter((post) => {
        // Implement your filter logic here based on currentFilter
        return true; // Placeholder logic for now
      });
      setFilteredPosts(newFilteredPosts);
    }
  }, [currentFilter]);



  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Fetchen der Bilder aus dem Supabase Storage
        const { data, error } = await supabase.storage
          .from("images")
          .list(userId + "/", {
            limit: 100,
            offset: 0,
            sortBy: { column: "name", order: "asc" },
          });

        if (data) {
          setImages(data);
          console.log(data);
          setLoadedImages(true)
        } else {
          console.log(error);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchImages();
  }, [userId]);


  console.log(loadedImages)
  console.log(currentFilter.selectedFilter);
  


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
                pathId={post.pathId}
              />
            </div>
          ))}

        {loadedPosts === null && !loadedImages && (
          <div className={styles.noLoadedPosts_div}>
            <p> hier gibt es noch keine Posts 🥲 </p>
          </div>
        )}

        {loadedImages &&
          currentFilter.selectedFilter === "heiß" && (
            <div className={styles.imageGallery}>
              {images.map((image) => (
                <div className={styles.image_div}>
                  <img
                    key={image.id}
                    src={CDN_URL_USERID + "/" + image.name}
                    alt="gallery-image"
                    className={styles.img}
                  />

                  <p className={styles.img_info}> *Fotobeschreibung*</p>
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  );
};

export default Feed;
