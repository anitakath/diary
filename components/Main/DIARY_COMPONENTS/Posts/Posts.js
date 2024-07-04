
//COMPONENTS
import Post from "../../Feed/Post";
//STYLES
import styles from './Posts.module.css'

const AnnesPosts = (props) =>{

    const posts = props.posts
    const isLoaded = props.isLoaded;

    return (
        <div>
            {isLoaded && posts.length === 0 &&(
                <div className={styles.nopost_p_div}>
                    <p className={styles.nopost_p}> bisher scheinst du noch keinen Tagebucheintrag getätigt zu haben </p>
                </div>
            )}
            {isLoaded &&
            posts &&
            posts.length > 0 &&
            posts.map((post, index) => (
                <div className={styles.post_container} key={index}>
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

export default AnnesPosts