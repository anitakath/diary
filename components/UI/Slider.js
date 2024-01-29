
import React, { useState, useEffect } from "react";
import styles from "../../styles/UI/Slider.module.css"; 



//REDUX
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "@/store/toggleSlice";


//FONT AWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";


const Slider = () => {


  const [isNightMode, setIsNightMode] = useState(false); // Setze den initialen Modus basierend auf dem prefers-color-scheme

  const dispatch = useDispatch();
  const toggleMode = useSelector((state) => state.toggle);


  

  const toggleHandler = () => {
    setIsNightMode(!isNightMode);
    dispatch(toggle());

    if(isNightMode){
      localStorage.setItem("isNightMode", true);
    } else{
      localStorage.setItem("isNightMode", false);
    }

  };




  


  return (
    <div className={styles.sliderContainer}>
      {/* Verwende die definierten Klassen aus dem CSS-Modul */}
      <label className={styles.switch}>
        <input type="checkbox" onChange={toggleHandler} checked={isNightMode} />
        <span className={`${styles.slider} ${styles.round}`}>
          {!toggleMode && (
            <FontAwesomeIcon icon={faSun} className={styles.sun} />
          )}
          {toggleMode && (
            <FontAwesomeIcon icon={faMoon} className={styles.moon} />
          )}
        </span>
      </label>
    </div>
  );
};

export default Slider;
