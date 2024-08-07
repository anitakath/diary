import Link from 'next/link';
//SUPABASE
import { signInWithGooogle } from '@/services/supabaseClient';
//STYLES
import styles from '../components/Main/Login/Login.module.css'

//FONT AWESOME
import { faRedditAlien } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
//REDUX 
import { useDispatch, useSelector} from "react-redux";
import { useUser } from '@/hooks/useUser';
import { useRouter } from 'next/router';
import { login } from '@/store/authSlice';
const Start = () =>{
  const nightMode = useSelector((state) => state.toggle);
  const dispatch = useDispatch();

  const handleSignInWithGoogle = async()=>{
    try{
      const data = await signInWithGooogle();
      console.log(data)
      if(data){
       dispatch(login()); 
      } else{
       console.error("no user data returned")
      }
    } catch(error){
      console.error('google sign in error', error)
    }    
  }

  return (
    <div className={`${styles.container} ${nightMode.isNightMode ? styles.container_dark : styles.container_light}`}>
      <div className={styles.reddit_container}>
        <FontAwesomeIcon icon={faRedditAlien} className={styles.icon} />
        <Link href="/login" className={styles.reddit_title}>
          Login
        </Link>
        <h2 className={styles.reddit_title}> or </h2>
        <Link href="/register" className={styles.reddit_title}>
          Register
        </Link>
      </div>

      <p> sign in with... </p>

      <div className={styles.google_container}>
        <button
          className={styles.google_button}
          onClick={handleSignInWithGoogle}
        >
          <FontAwesomeIcon icon={faGoogle} className={styles.icon} />
          oogle
        </button>
      </div>
    </div>
  );
}

export default Start;