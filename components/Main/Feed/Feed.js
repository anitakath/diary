import React from 'react';
import { useState, useEffect } from "react";
import Link from 'next/link';
//COMPONENTS
import CreatePost from "./CreatePost";
import Post from "./Post";
import Filter from './Filter';
import YourImgDiary from './YOUR_IMG_DIARY/YourImgDiary';
//STYLES
import styles from '../../../styles/Main/Feed/Feed.module.css';
//REDUX 
import { useSelector, useDispatch } from "react-redux";
import { supabase } from '@/services/supabaseClient';
import { setSupebaseImages } from '@/store/supabaseImagesSlice';


//CUSTOM HOOKS
import useFormatDate from '@/components/custom_hooks/useFormatDate';

const Feed = (props) => {
  const currentFilter = useSelector((state) => state.filter);
  const loadedPosts = props.posts;
  const userId = props.currentGoogleUserId;
  const CDN_URL = process.env.CDN_URL;
  const CDN_URL_USERID = `${CDN_URL}${userId}`;
  const [images, setImages] = useState([]);
  const [loadedImages, setLoadedImages] = useState(false);
  const { formatDate1, formatDate2, formatDate3 } = useFormatDate("German");
  const [selectedDateFormat, setSelectedDateFormat] = useState("format1");

  
  const handleDateClick = () => {
    if (selectedDateFormat === "format1") {
      setSelectedDateFormat("format2");
    } else if (selectedDateFormat === "format2") {
     setSelectedDateFormat("format3");
    } else {
     setSelectedDateFormat("format1");
    }
  };

  useEffect(() => {
    if (loadedPosts) {
     setLoadedImages(true);
    }
  }, [loadedPosts]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      fetchImages();
    }
  }, [userId]);

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


  return (
    <div className={styles.container}>
      <Filter />

      <CreatePost />

      {!loadedImages && (
        <p className={styles.loadingPostsParagraph}> loading posts ...</p>
      )}
      <div className={styles.post_div}>
        {loadedImages &&
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

        {currentFilter.selectedFilter === "deine_images" && <YourImgDiary />}



        {/*IMPLEMENT ANNESIMGDIARY! */}
        {images.length > 0 &&
          currentFilter.selectedFilter === "annes_images" && (
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
