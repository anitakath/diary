import Image from "next/image";
import Link from "next/link";

//STYLES
import styles from "../../styles/Main/WebUser.module.css";

//IMAGES
//import space from "../images/space.jpg";

//FONT AWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faRedditAlien } from "@fortawesome/free-brands-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

const MobileUser = () =>{
    return (
      <div className={styles.MobileUser_container}>
        <button>
          <FontAwesomeIcon
            icon={faUsers}
            className={styles.users}
          ></FontAwesomeIcon>
          <p> + </p>
        </button>
      </div>
    );
}

export default MobileUser