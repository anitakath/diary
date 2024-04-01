
import { useState, useEffect, useContext } from 'react';
import styles from './YourImgDiary.module.css'

import { supabase } from '@/services/supabaseClient';

import { RedditContext } from '@/context/RedditContext';
import { setUser } from '@/store/userSlice';

//REDUX
import { useDispatch, useSelector } from "react-redux";

import Link from 'next/link';







const YourImgDiary = () =>{


    const { currentGoogleUser } = useContext(RedditContext);
    const nightMode = useSelector((state) => state.toggle.isNightMode);

    const [style, setStyle] = useState(false);

    useEffect(() => {
        setStyle(nightMode);
    }, [nightMode]);

    console.log(nightMode);


    const [images, setImages] = useState([]);
    const [imagesLoaded, setImagesLoaded] = useState(false)

    const [userId, setUserId] = useState('')

    useEffect(()=>{
        if(currentGoogleUser){
            setUserId(currentGoogleUser.user.id)
        }
    }, [])

    console.log(userId)
   

    useEffect(() =>{


        const fetchImages = async() =>{
            const { data, error } = await supabase
                .from("users_images")
                .select("*")
                .order("id", { ascending: false });

            if(data){
                console.log(data)
                setImages(data)
                setImagesLoaded(true)
            } else{
                console.log(error)
            }

        }

        fetchImages()




       }, [userId])


       console.log(images)



    return (
      <div className={styles.container}>
        <h1 className={style ? styles.title_darkmode : styles.title}>
          DEIN BILDERTAGEBUCH
        </h1>
        {imagesLoaded &&
          images.map((image) => (
            <div className={styles.diarypost_div}>
              <img src={image.url} key={image.id} className={styles.img}></img>
              <Link className={style ? styles.link_darkmode : styles.link} href={`/dein-bildertagebuch/${image.name}`}> Eintrag einsehen </Link>
            </div>
          ))}
      </div>
    );
}


export default YourImgDiary