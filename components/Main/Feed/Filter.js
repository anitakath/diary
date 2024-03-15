import { useEffect, useState } from "react";


//REDUX
import { filter, setActButton} from "@/store/filterSlice";
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
  const nightMode = useSelector((state) => state.toggle.nightMode);

  //console.log(currentFilter)
  const [bestIsActive, setBestIsActive] = useState(false);
  const [hotIsActive, setHotIsActive] = useState(false);
  const [newIsActive, setNewIsActive] = useState(false);
  const [topIsActive, setTopIsActive] = useState(false);
  const [deineIsActive, setDeineIsActive] = useState(false);
  const [activeButton, setActiveButton] = useState(null);

    const storedFilter =
      typeof window !== "undefined"
        ? localStorage.getItem("selectedFilter") || "beste"
        : "beste";

  useEffect(() =>{
   

    if (currentFilter.bestIsActive) {
      setBestIsActive(true);
    } else if (currentFilter.hotIsActive) {
      setHotIsActive(true);
      setActiveButton("heiß");
    } else if (currentFilter.newIsActive) {
      setNewIsActive(true);
      setActiveButton("neu");
    } else if (currentFilter.topIsActive) {
      setTopIsActive(true);
      setActiveButton("top");
    } else if (currentFilter.deineIsActive) {
      setDeineIsActive(true);
      setActiveButton("deine");
    }
  }, [currentFilter])


 


  useEffect(()=>{

    if (storedFilter === "beste") {
      setActiveButton("beste");
    } else if (storedFilter === "heiß") {
      setActiveButton("heiß");
    } else if (storedFilter === "neu") {
      setActiveButton("neu");
    } else if (storedFilter === "top") {
      setActiveButton("top");
    } else if (storedFilter === "deine") {
      setActiveButton("deine");
    }
  

  }, [])



  


  const filterHandler = (title) => {
    if (title === "beste") {
      dispatch(filter("beste"));
      dispatch(setActButton('beste' ));
   
      setActiveButton(title)
     

    } else if (title === "heiß") {
      dispatch(filter("heiß"));
      dispatch(setActButton('heiß' ));
      //dispatch(setActiveButton(title));
      setActiveButton(title);


    } else if (title === "neu") {
      dispatch(filter("neu"));
      //dispatch(setActiveButton(title));
      setActiveButton(title);
    } else if (title === "top") {
      dispatch(filter("top"));
      //dispatch(setActiveButton(title));
      setActiveButton(title);

    } else if (title === "deine") {
      dispatch(filter("deine"));
      //dispatch(setActiveButton(title));
      setActiveButton(title);

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
            anne
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
