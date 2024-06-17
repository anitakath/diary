import { useEffect, useState } from "react";


//REDUX
import { filter, setActButton} from "@/store/filterSlice";
import { useDispatch, useSelector } from "react-redux";


//STYLES
import styles from "../../../styles/Main/Feed/Filter.module.css";



const Filter = () => {

  const dispatch = useDispatch();

  const activeLinkStyle = {
    fontWeight: "bold", 
    color: " #F7567C", 
  };


  const currentFilter = useSelector((state) => state.filter);

  const [activeButton, setActiveButton] = useState(null);

  const [filterState, setFilterState] = useState({
    deinePostsIsActive: false,
    annesImagesIsActive: false,
    deineImagesIsActive: false,
    annesPostsIsActive: false,
    activeButton: null,
  });

  const storedFilter = typeof window !== "undefined" ? localStorage.getItem("selectedFilter") || "deine_posts" : "deine_posts";



  useEffect(() => {
    if (currentFilter.bestIsActive) {
      setFilterState({
        ...filterState,
        deinePostsIsActive: true,
        activeButton: "deine_posts",
      });
    } else if (currentFilter.hotIsActive) {
      setFilterState({
        ...filterState,
        annesImagesIsActive: true,
        activeButton: "annes_images",
      });
    } else if (currentFilter.newIsActive) {
      setFilterState({
        ...filterState,
        deineImagesIsActive: true,
        activeButton: "deine_images",
      });
    } else if (currentFilter.deineIsActive) {
      setFilterState({
        ...filterState, 
        annesPostsIsActive: true,
        activeButton: "annes_posts",
      });
    }
  }, [currentFilter]);

  useEffect(() => {
    setActiveButton(storedFilter);
  }, []);



  const filterHandler = (title) => {

    console.log(title)
    dispatch(filter(title));
    dispatch(setActButton(title));
    setActiveButton(title);
  };



  return (
    <div className={styles.container_wrapper}>
      <div className={styles.container}>
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
    </div>
  );
};

export default Filter;
