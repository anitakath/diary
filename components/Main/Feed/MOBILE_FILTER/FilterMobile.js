
import { useEffect, useState } from "react";

//REDUX
import { filter, setActButton } from "@/store/filterSlice";
import { useDispatch, useSelector } from "react-redux";


import styles from './FilterMobile.module.css'

const FilterMobile = () =>{


    const dispatch = useDispatch();


    const currentFilter = useSelector((state) => state.filter);
    const nightMode = useSelector((state) => state.toggle.nightMode);

    //console.log(currentFilter)
    const [deinePostsIsActive, setDeinePostsIsActive] = useState(false);
    const [annesImagesIsActive, setAnnesImagesIsActive] = useState(false);
    const [deineImagesIsActive, setDeineImagesActive] = useState(false);

    const [annesPostsIsActive, setAnnesPostsIsActive] = useState(false);
    const [activeButton, setActiveButton] = useState(null);

    const storedFilter =
        typeof window !== "undefined"
        ? localStorage.getItem("selectedFilter") || "deine_posts"
        : "deine_posts";



  const activeLinkStyle = {
    fontWeight: "bold", // Hier kannst du das Styling für den aktiven Link anpassen
    color: " #F7567C", // Zum Beispiel die Schriftfarbe ändern
  };

           
  useEffect(() => {
    if (currentFilter.bestIsActive) {
      setDeinePostsIsActive(true);
      setActiveButton("deine_posts");
    } else if (currentFilter.hotIsActive) {
      setAnnesImagesIsActive(true);
      setActiveButton("annes_images");
    } else if (currentFilter.newIsActive) {
      setDeineImagesActive(true);
      setActiveButton("deine_images");
    } else if (currentFilter.deineIsActive) {
      setAnnesPostsIsActive(true);
      setActiveButton("annes_posts");
    }
  }, [currentFilter]);

  useEffect(() => {
    if (storedFilter === "deine_posts") {
      setActiveButton("deine_posts");
    } else if (storedFilter === "annes_images") {
      setActiveButton("annes_images");
    } else if (storedFilter === "deine_images") {
      setActiveButton("deine_images");
    } else if (storedFilter === "annes_posts") {
      setActiveButton("annes_posts");
    }
  }, []);




    const filterHandler = (title) => {
        if (title === "deine_posts") {
          dispatch(filter("deine_posts"));
          dispatch(setActButton("deine_posts"));
          setActiveButton(title);
        } else if (title === "annes_images") {
          dispatch(filter("annes_images"));
          dispatch(setActButton("annes_images"));
          //dispatch(setActiveButton(title));
          setActiveButton(title);
        } else if (title === "deine_images") {
          dispatch(filter("deine_images"));
          //dispatch(setActiveButton(title));
          setActiveButton(title);
        } else if (title === "annes_posts") {
          dispatch(filter("annes_posts"));
          //dispatch(setActiveButton(title));
          setActiveButton(title);
        }
    };

        



    return (
      <div className={styles.mobileFilter_div}>

          <h1 className={styles.filter_title}> Filtere Posts und Tagebuch-Einträge</h1>
        <div>
          <button
            className={styles.filter_btn}
            onClick={() => filterHandler("deine_posts")}
            style={
              activeButton === "deine_posts" ? { ...activeLinkStyle } : null
            }
          >
            DEINE POSTS
          </button>
        </div>
        <div>
          <button
            className={styles.filter_btn}
            onClick={() => filterHandler("deine_images")}
            style={
              activeButton === "deine_images" ? { ...activeLinkStyle } : null
            }
          >
            DEIN BILDERTAGEBUCH
          </button>
        </div>
        <div>
          <button
            className={styles.filter_btn}
            onClick={() => filterHandler("annes_images")}
            style={
              activeButton === "annes_images" ? { ...activeLinkStyle } : null
            }
          >
            ANNES BILDERTAGEBUCH
          </button>
        </div>

        <div>
          <button
            className={styles.filter_btn}
            onClick={() => filterHandler("annes_posts")}
            style={
              activeButton === "annes_posts" ? { ...activeLinkStyle } : null
            }
          >
            ANNE
          </button>
        </div>
      </div>
    );
}

export default FilterMobile