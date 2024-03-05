// 404.js
import Link from "next/link";


//STYLES
import styles from '../styles/404.module.css'

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";


export default function FourOhFour() {



 const nightMode = useSelector((state) => state.toggle.isNightMode);
 const [style, setStyle] = useState(false);

 useEffect(() => {
   setStyle(nightMode);
 }, [nightMode]);



  return (
    <div  className={style ? styles.fourOhFour_div_dark : styles.fourOhFour_div_light}>
        <div className={styles.fourOhFour_wrapper}>
            <h1 className={style ? styles.title_dark : styles.title_light}> 404 - Page Not Found *</h1>
            <Link href="/"  className={style ? styles.link_dark : styles.link_light}>
                Zurück zur Startseite
            </Link>
        </div>
     
      <p className={style ? styles.infoText_dark : styles.infoText_light}> * or in progress. Schau doch sonst später nochmal vorbei! </p>
    </div>
  );
}
