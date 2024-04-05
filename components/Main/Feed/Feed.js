

import React from 'react';
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from 'next/link';

//COMPONENTS
import CreatePost from "./CreatePost";
import Post from "./Post";
import Filter from './Filter'
import WebUser from "../WebUser";
import YourImgDiary from './YOUR_IMG_DIARY/YourImgDiary';

//STYLES
import styles from '../../../styles/Main/Feed/Feed.module.css'

//REDUX 
import { useSelector, useDispatch } from "react-redux";
import { supabase } from '@/services/supabaseClient';
import { setSupebaseImages } from '@/store/supabaseImagesSlice';
import { current } from '@reduxjs/toolkit';

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
  const [loadedImages, setLoadedImages] = useState(false);
  const [selectedDateFormat, setSelectedDateFormat] = useState("format1"); // Zustand für ausgewähltes Datumsformat


  


  const storedFilter =
    typeof window !== "undefined"
      ? localStorage.getItem("selectedFilter") || "deine_posts"
      : "deine_posts";

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

  const dispatch = useDispatch();

  const fetchImages = async () => {
    const { data, error } = await supabase.storage
      .from("images")
      .list(userId + "/", {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });

    if (data !== null) {


      const cutAlternativeObject = data.filter(obj => obj.name !== "alternatives")
      const filteredImages = cutAlternativeObject.filter(
        (image) => !image.name.startsWith(".")
      ); // Filtert Dateien, die nicht mit "." beginnen



      const sortedImages = filteredImages
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .map((image) => ({ ...image, loaded: false }));

      setImages(sortedImages);
      dispatch(setSupebaseImages(filteredImages));
      if (filteredImages.length > 0) {
        setLoadedImages(true);
      }
    } else {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchImages();
    }
  }, [userId]);








  const formatDate1 = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day < 10 ? "0" + day : day}.${
      month < 10 ? "0" + month : month
    }.${year}`;
  };

  const formatDate2 = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${month < 10 ? "0" + month : month}.${
      day < 10 ? "0" + day : day
    }.${year}`;
  };

  const formatDate3 = (dateString) => {
  const months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

  const date = new Date(dateString);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${day}. ${months[monthIndex]}, ${year}`;
};

   const handleDateClick = () => {
     if (selectedDateFormat === "format1") {
       setSelectedDateFormat("format2");
     } else if (selectedDateFormat === "format2") {
       setSelectedDateFormat("format3");
     } else {
       setSelectedDateFormat("format1");
     }
   };




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

        {loadedPosts === null && !loadedImages && images.length <= 0 && (
          <div className={styles.noLoadedPosts_div}>
            <p> hier gibt es noch keine Posts 🥲 </p>
          </div>
        )}

        {currentFilter.selectedFilter === "deine_images"  && <YourImgDiary />}

        {images.length > 0 && currentFilter.selectedFilter === "annes_images" && (
          <div className={styles.imageGallery}>
            {images.map((image) => (
              <div className={styles.image_div} key={image.id}>
                <button className={styles.date} onClick={handleDateClick}>
                  {selectedDateFormat === "format1" &&
                    formatDate1(image.created_at)}
                  {selectedDateFormat === "format2" &&
                    formatDate2(image.created_at)}
                  {selectedDateFormat === "format3" &&
                    formatDate3(image.created_at)}
                </button>

                {!loadedImages && (
                  <div className={styles.loadingImage}>
                    <div className={styles.spinner}></div>{" "}
                    {/* Hier wird der Spinner eingefügt */}
                    <p> Lädt... </p>
                  </div>
                )}

                <Link href={`/image/${image.name}`}>
                  <img
                    key={image.id}
                    src={CDN_URL_USERID + "/" + image.name}
                    alt="gallery-image"
                    className={styles.img}
                  />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
