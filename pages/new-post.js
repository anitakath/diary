import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect} from "react";
import { useSelector } from "react-redux";

//COMPONENTS
import Header from "@/components/Header/Header";
import NewPostForm from "@/components/Main/NewPost/NewPostForm";
import WebUser from "@/components/Main/WebUser";
import Start from "@/components/Start";





//STYLES
import styles from '../styles/Main/CreatePost.module.css'




const NewPost = () =>{


  const nightMode = useSelector((state) => state.toggle.isNightMode);
  const [style, setStyle] = useState(false);

  useEffect(() => {
    setStyle(nightMode);
  }, [nightMode]);



  

    return (
      <div>
        <div className="App">
          
          <NewPostForm />
        </div>
      </div>
    );
}

export default NewPost;