
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useUser } from "@/hooks/useUser";
import Post from "../../Feed/Post";

import styles from './Community.module.css'


const Community = (props) =>{

    const posts = props.posts
    const currentFilter = useSelector((state) => state.filter.selectedFilter);
    const { userId } = useUser();
    const [loaded, setLoaded] = useState(false)

    console.log(userId)
    console.log(currentFilter)
    console.log(posts)

    useEffect(() => {
      if (posts) {
        setLoaded(true)
        const filteredPosts = posts.filter((post) => post.userId !== userId);
        console.log(filteredPosts);
      }
    }, [posts]);

    console.log(posts)

    return (
      <div>
        {loaded &&
          posts.map((post) => (
            <div className={styles.post_container} key={post.id}>
              <Post
                post={post}
                id={post.id}
                author={props.author}
                created_at={post.created_at}
                table={post.table}
                description={post.description}
                downvotes={post.downvotes}
                title={post.title}
                upvotes={post.upvotes}
                currentGoogleUserId={props.currentGoogleUserId}
                pathId={post.pathId}
              />
            </div>
          ))}
      </div>
    );
}

export default Community