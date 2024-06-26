import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import useFormatDate from "@/components/custom_hooks/useFormatDate";

import styles from "./AnnesImgDiary.module.css";
import { useUser } from "@/hooks/useUser";
import { useDispatch } from "react-redux";
import { supabase } from "@/services/supabaseClient";
import { setSupebaseImages } from "@/store/supabaseImagesSlice";

const AnnesImgDiary = (props) => {
  const { currentGoogleUser, saveAndUpdateUser, currentUser, userId } =
    useUser();
  const { formatDate1, formatDate2, formatDate3 } = useFormatDate("German");
  const [selectedDateFormat, setSelectedDateFormat] = useState("format1");
  const [images, setImages] = useState([]);
  const [loadedImages, setLoadedImages] = useState(false);
  const CDN_URL_USERID = props.CDN_URL_USERID;
  const dispatch = useDispatch();



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
    const fetchAnnesImages = async () => {
      const { data, error } = await supabase.storage
        .from("images")
        .list(userId + "/", {
          limit: 100,
          offset: 0,
          sortBy: { column: "name", order: "asc" },
        });
      if (data !== null) {
        const cutAlternativeObject = data.filter(
          (obj) => obj.name !== "alternatives"
        );
        const filteredImages = cutAlternativeObject.filter(
          (image) => !image.name.startsWith(".")
        );

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
    fetchAnnesImages();
  }, []);


  

  return (
    <div className={styles.imageGallery}>
      <img src="https://rqroknrdyivtmzueqykq.supabase.co/storage/v1/object/public/images/24a00206-cda8-4e30-a43e-c5d8efed3266/pexels-poleplace-online-poledance-studio-610999695-17286900.jpg" />
      {images.map((image) => (
        <div className={styles.image_div} key={image.id}>
          <button className={styles.date} onClick={handleDateClick}>
            {selectedDateFormat === "format1" && formatDate1(image.created_at)}
            {selectedDateFormat === "format2" && formatDate2(image.created_at)}
            {selectedDateFormat === "format3" && formatDate3(image.created_at)}
          </button>

          {!loadedImages && (
            <div className={styles.loadingImage}>
              <div className={styles.spinner}></div>
              <p> Lädt... </p>
            </div>
          )}

          <h1> {image.name} </h1>
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
  );
};
export default AnnesImgDiary;
