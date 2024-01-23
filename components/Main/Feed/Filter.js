import { useState } from "react";


//REDUX
import { filter } from "@/store/filterSlice";
import { useDispatch, useSelector } from "react-redux";



//STYLES
import styles from "../../../styles/Main/Feed/Filter.module.css";

const Filter = () => {

  const dispatch = useDispatch();


  const activeLinkStyle = {
    fontWeight: "bold", // Hier kannst du das Styling für den aktiven Link anpassen
    color: " #F7567C", // Zum Beispiel die Schriftfarbe ändern
  };


  const currentFilter = useSelector((state) => state.filter);
  const nightMode = useSelector((state) => state.toggle);




  const [bestIsActive, setBestIsActive] = useState(false);
  const [hotIsActive, setHotIsActive] = useState(false);
  const [newIsActive, setNewIsActive] = useState(false);
  const [topIsActive, setTopIsActive] = useState(false);
  const [deineIsActive, setDeineIsActive] = useState(false);
  const [activeButton, setActiveButton] = useState(null);



  const filterHandler = (title) => {
    if (title === "beste") {
      dispatch(filter("beste"));
      setActiveButton(title)

      setBestIsActive(true);
      setHotIsActive(false);
      setNewIsActive(false);
      setTopIsActive(false);
      setDeineIsActive(false);

    } else if (title === "heiß") {
      dispatch(filter("heiß"));
      setActiveButton(title);

      setBestIsActive(false);
      setHotIsActive(true);
      setNewIsActive(false);
      setTopIsActive(false);
      setDeineIsActive(false);
    } else if (title === "neu") {
      dispatch(filter("neu"));
      setActiveButton(title);

      setBestIsActive(false);
      setHotIsActive(false);
      setNewIsActive(true);
      setTopIsActive(false);
      setDeineIsActive(false);
    } else if (title === "top") {
      dispatch(filter("top"));
      setActiveButton(title);

      setBestIsActive(false);
      setHotIsActive(false);
      setNewIsActive(false);
      setDeineIsActive(false);
      setTopIsActive(true);
    } else if (title === "deine") {
      dispatch(filter("deine"));
      setActiveButton(title);

      setBestIsActive(false);
      setHotIsActive(false);
      setNewIsActive(false);
      setTopIsActive(false);
      setDeineIsActive(true)
    }
  };

  return (
    <div className={styles.container_wrapper}>
      <div
        className={` ${styles.container} ${
          nightMode ? styles.container_dark : styles.container_light
        }`}
      >
        <div>
          <button
            className={styles.filter_btn}
            onClick={() => filterHandler("beste")}
            style={activeButton === "beste" ? { ...activeLinkStyle } : null}
          >
            {" "}
            beste{" "}
          </button>
        </div>
        <div>
          <button
            className={styles.filter_btn}
            onClick={() => filterHandler("heiß")}
            style={activeButton === "heiß" ? { ...activeLinkStyle } : null}
          >
            {" "}
            heiß{" "}
          </button>
        </div>
        <div>
          <button
            className={styles.filter_btn}
            onClick={() => filterHandler("neu")}
            style={activeButton === "neu" ? { ...activeLinkStyle } : null}
          >
            {" "}
            neu{" "}
          </button>
        </div>
        <div>
          <button
            className={styles.filter_btn}
            onClick={() => filterHandler("top")}
            style={activeButton === "top" ? { ...activeLinkStyle } : null}
          >
            {" "}
            top{" "}
          </button>
        </div>
        <div>
          <button
            className={styles.filter_btn}
            onClick={() => filterHandler("deine")}
            style={activeButton === "deine" ? { ...activeLinkStyle } : null}
          >
            deine
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
