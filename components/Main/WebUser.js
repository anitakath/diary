import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';
//STYLES
import styles from '../../styles/Main/WebUser.module.css'
//FONT AWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
//CONTEXT
import { RedditContext } from "@/context/RedditContext";
//REDUX
import { useSelector } from "react-redux";


const WebUser = () => {

const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
const { currentGoogleUser } = useContext(RedditContext);
  
 const nightMode = useSelector((state) => state.toggle.isNightMode);
 const [style, setStyle] = useState(false);

 useEffect(() => {
   setStyle(nightMode);
 }, [nightMode]);


  let avatarUrl;

  if (currentGoogleUser) {
    avatarUrl = currentGoogleUser.user?.user_metadata?.avatar_url; // Zugriff auf das Profilfoto
  }


  const buttonLinks = [
    { href: "/new-post", text: "POST ERSTELLEN" },
    { href: "/neuer-bildeintrag", text: "BILDERTAGEBUCH-EINTRAG ERSTELLEN" },
    { href: "/", text: "community erstellen" },
  ];


  return (
    <div className={styles.container}>
      <div
        className={`${styles.fixed_div} ${style ? styles.dark : styles.light}`}
      >
        <Image
          alt="Beschreibung des Bildes"
          width={100} // Setze hier die gewünschte Breite
          height={50} // Setze- hier die gewünschte Höhe
          priority={true}
          className={styles.spaceImage}
          src="/space.jpg"
        />

        <div className={styles.home_container}>
          {isLoggedIn ? (
            <Image
              alt="foto des Users"
              src={avatarUrl || "/placeholder.jpg"}
              width={80}
              height={200}
              className={styles.users_image_mini}
              xw="true"
              priority
            ></Image>
          ) : (
            <FontAwesomeIcon icon={faQuestion} className={styles.icon} />
          )}
          <p className={`${styles.users_name} ${ style ? styles.user_name_light : "" }`}>Home</p>
        </div>

        <div className={styles.info_paragraph_container}>
          <p className={`${styles.info_p} ${style ? styles.info_p_light : ""}`}>
            {" "}
            Deine ganz persönliche Reddit Startseite. <br /> Hier kannst du dir
            deine Lieblingscommunities ansehen{" "}
          </p>
        </div>
        <div className={styles.btn_container}>
          {buttonLinks.map((link, index) => (
            <Link key={index} href={link.href} className={styles.link}>
              {link.text} 
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WebUser;
