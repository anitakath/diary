
//COMPONENTS
import Main from '@/components/Main/Main';
//STYLES
import styles from '../styles/Index.module.css'
//HOOKS
import { usePosts } from "@/hooks/usePosts";
import { useUser } from "@/hooks/useUser";
import { useNightMode } from "@/hooks/usenightMode";
import { useEffect } from 'react';

import { useSelector } from 'react-redux';

export default function Home() {
 
 const { style } = useNightMode();


  return (
    <div className={style ? styles.main_container : styles.main_container_light}>
      <Main/>
    </div>
  );
}
