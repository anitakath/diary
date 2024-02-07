import useSWR  from "swr";
import {useState, useEffect} from 'react'


//CONTEXT
import { useContext } from "react";
import { RedditContext } from "@/context/RedditContext";


//REDUX
import { useSelector } from "react-redux";

//STYLES
import styles from '../../../styles/Main/PostDetails.module.css'

const Comments = ({postId}) =>{


    const [comments, setComments] = useState([])

    const nightMode = useSelector((state)=> state.toggle)

    const {fetcher} = useContext(RedditContext)

    const {data} = useSWR(
        `/api/get-comments?postId=${postId}`,
        fetcher,
        {refreshInterval: 200}
    )


    useEffect(()=>{
        if(!data) return
        setComments(data.data)
    }, [data])


    console.log(comments)
    return(
        <div className={nightMode ? styles.comments_container_dark : styles.comments_container} >
            <h1 className={styles.comments_title}> KOMMENTARE </h1>
            <h2> here: {comments} </h2>
        
        </div>
    )
}


export default Comments;