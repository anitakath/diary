
import React, { useState, useEffect } from "react";
import styles from "./Slider.module.css"; 



//REDUX
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "@/store/toggleSlice";





const Slider = () => {


  const [isNightMode, setIsNightMode] = useState(false); // Setze den initialen Modus basierend auf dem prefers-color-scheme

  const dispatch = useDispatch();
  const toggleMode = useSelector((state) => state.toggle);

  console.log(toggleMode);

  const toggleHandler = () => {
    setIsNightMode(!isNightMode);
    dispatch(toggle());

    if(isNightMode){
      localStorage.setItem("isNightMode", true);
    } else{
      localStorage.setItem("isNightMode", false);
    }

  };

  console.log(toggleMode);




  return (
    <div className={styles.sliderContainer}>
      {/* Verwende die definierten Klassen aus dem CSS-Modul */}
      <label className={styles.switch}>
        <input type="checkbox" onChange={toggleHandler} checked={isNightMode} />
        <span className={`${styles.slider} ${styles.round}`}>
          {" "}
          toggle button
        </span>
      </label>
    </div>
  );
};

export default Slider;
