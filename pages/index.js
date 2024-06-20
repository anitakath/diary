
//COMPONENTS
import Main from '@/components/Main/Main';
//STYLES
import styles from '../styles/Index.module.css'
//HOOKS
import { usePosts } from "@/hooks/usePosts";
import { useUser } from "@/hooks/useUser";
import { useNightMode } from "@/hooks/usenightMode";

export default function Home() {
 
 const { myPosts, addNewPost } = usePosts();
 const { currentGoogleUser, saveAndUpdateUser} = useUser();
 const { style } = useNightMode();


  let googleUserId;

  if (currentGoogleUser) {
    googleUserId = currentGoogleUser.user.id;
  }


  return (
    <div className={style ? styles.main_container : styles.main_container_light}>
      <Main
        addNewPost={addNewPost}
        posts={myPosts}
        currentGoogleUserId={googleUserId}
        nightMode={style}
      />
    </div>
  );
}
