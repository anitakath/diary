import Image from "next/image";
import { useState, useEffect, useContext} from "react";
import styles from './NewImages.module.css'
import { RedditContext } from "@/context/RedditContext";


const AlternativeImages = (props) =>{


    const [userId, setUserId] = useState(false);
    const CDN_URL = process.env.CDN_URL;
    const CDN_URL_USERID = `${CDN_URL}${userId}`;
      const { currentGoogleUser } = useContext(RedditContext);


    const alternativeImages = props.alternativeImages
    const handleAlternativeImageChange = props.handleAlternativeImageChange


    useEffect(() => {
        if (currentGoogleUser) {
        setUserId(currentGoogleUser.user.id);
        }
    }, [currentGoogleUser]);


    return (
      <div className={styles.alternativeImg_div}>
        {alternativeImages.map((image) => (
          <div className={styles.alternative_wrapper} key={image.id}>
            <input
              type="radio"
              id={image.name}
              name="alternativeImages"
              value={image.name}
              onChange={handleAlternativeImageChange}
              className={styles.alternativeImage_input}
            />

            <img
              key={image.id}
              src={CDN_URL_USERID + "/alternatives/" + image.name}
              alt="gallery-image"
              className={styles.alternativeImg}
            />
          </div>
        ))}
      </div>
    );
}

export default AlternativeImages