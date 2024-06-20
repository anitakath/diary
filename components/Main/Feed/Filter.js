import { useEffect, useState } from "react";
//REDUX
import { filter, setActButton} from "@/store/filterSlice";
import { useDispatch, useSelector } from "react-redux";
//STYLES
import styles from "../../../styles/Main/Feed/Filter.module.css";

const Filter = () => {

  const dispatch = useDispatch();
  const selectedFilter = useSelector((state) => state.filter.selectedFilter);

  const activeLinkStyle = {
    fontWeight: "bold", 
    color: " #F7567C", 
  };

  const filterHandler = (title) => {
    dispatch(filter(title));
    dispatch(setActButton(title));
  };


  return (
    <div className={styles.container_wrapper}>
      <div className={styles.container}>
        <div>
          <button
            className={styles.filter_btn}
            onClick={() => filterHandler("deine_posts")}
            style={
              selectedFilter === "deine_posts" ? { ...activeLinkStyle } : null
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
              selectedFilter === "deine_images" ? { ...activeLinkStyle } : null
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
              selectedFilter === "annes_images" ? { ...activeLinkStyle } : null
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
              selectedFilter === "annes_posts" ? { ...activeLinkStyle } : null
            }
          >
            ANNE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
