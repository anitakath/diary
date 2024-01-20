
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
   /* if (toggleMode === "light") {
      dispatch(toggle());
      console.log("toggle mode: light");
    } else if (toggleMode === "dark") {
      dispatch(toggle());
      console.log("toggle mode: dark");
    }*/

    
  };

  console.log(toggleMode);



  /* Aktualisiere die Wurzelvariablen basierend auf dem Nachtmodusstatus
  const updateRootVariables = (nightMode) => {
    const root = document.documentElement;
    if (nightMode) {
      root.style.setProperty("--foreground-rgb", "255, 255, 255");
      root.style.setProperty("--background-start-rgb", "0, 0, 0");
      root.style.setProperty("--background-end-rgb", "0, 0, 0");
    } else {
      root.style.setProperty("--foreground-rgb", "0, 0, 0");
      root.style.setProperty("--background-start-rgb", "214, 219, 220");
      root.style.setProperty("--background-end-rgb", "255, 255, 255");
    }
  };*/

  /* Überwache Änderungen an isNightMode und aktualisiere die Wurzelvariablen entsprechend
  useEffect(() => {
    updateRootVariables(isNightMode);
  }, [isNightMode]);

  console.log(isNightMode) */

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
