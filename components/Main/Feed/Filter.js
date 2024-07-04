import { useEffect, useState } from "react";
//REDUX
import { filter, setActButton} from "@/store/filterSlice";
import { useDispatch, useSelector } from "react-redux";
//STYLES
import styles from "../../../styles/Main/Feed/Filter.module.css";
import { useUser } from "@/hooks/useUser";

const Filter = () => {

  const dispatch = useDispatch();
  const selectedFilter = useSelector((state) => state.filter.selectedFilter);
  const activeLinkStyle = {
    fontWeight: "bold", 
    color: " #F7567C", 
  };
  const [group, setGroup] = useState("private")

  const {userId} = useUser();
  

  const filterHandler = (title) => {
    dispatch(filter(title));
    dispatch(setActButton(title));
  };

  const setGroupHandler = (e) =>{

    console.log(e)
    if(e === "private"){

      setGroup("private")
    } else if (e === "community"){

      setGroup("community")
    }

  }


  return (
    <div className={styles.container_wrapper}>
      <div className={styles.community_private_div}>
        <div>
          <button
            className={`${styles.community_btn} ${
              group === "community" ? styles.activeGroup : ""
            }`}
            onClick={() => setGroupHandler("community")}
          >
            COMMUNITY
          </button>
        </div>

        <div>
          <button
            className={`${styles.community_btn} ${
              group === "private" ? styles.activeGroup : ""
            }`}
            onClick={() => setGroupHandler("private")}
          >
            PRIVAT
          </button>
        </div>
      </div>

      <div className={styles.container}>
        {group === "private" && (
          <div className={styles.container_div}>
            <div>
              <button
                className={styles.filter_btn}
                onClick={() => filterHandler("deine_posts")}
                style={
                  selectedFilter === "deine_posts"
                    ? { ...activeLinkStyle }
                    : null
                }
              >
                DEIN TAGEBUCH
              </button>
            </div>
            {!userId === "4d47a2af-f29f-4530-bec6-0f08c7dd347c" && <p> moin</p>}
            <div>
              <button
                className={styles.filter_btn}
                onClick={() => filterHandler("deine_images")}
                style={
                  selectedFilter === "deine_images"
                    ? { ...activeLinkStyle }
                    : null
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
                  selectedFilter === "annes_images"
                    ? { ...activeLinkStyle }
                    : null
                }
              >
                BEISPIEL BILDERTAGEBUCH
              </button>
            </div>

            <div>
              <button
                className={styles.filter_btn}
                onClick={() => filterHandler("annes_posts")}
                style={
                  selectedFilter === "annes_posts"
                    ? { ...activeLinkStyle }
                    : null
                }
              >
                ANNE
              </button>
            </div>
          </div>
        )}

        {group === "community" && (
          <div className={styles.container_div}>
            <div>
              <button
                className={styles.filter_btn}
                onClick={() => filterHandler("community")}
                style={
                  selectedFilter === "community"
                    ? { ...activeLinkStyle }
                    : null
                }
              >
                COMMUNITY
              </button>
            </div>
            {/*
            <div>
              <button
                className={styles.filter_btn}
                onClick={() => filterHandler("deine_images")}
                style={
                  selectedFilter === "deine_images"
                    ? { ...activeLinkStyle }
                    : null
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
                  selectedFilter === "annes_images"
                    ? { ...activeLinkStyle }
                    : null
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
                  selectedFilter === "annes_posts"
                    ? { ...activeLinkStyle }
                    : null
                }
              >
                ANNE
              </button>
              </div>*/}
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
