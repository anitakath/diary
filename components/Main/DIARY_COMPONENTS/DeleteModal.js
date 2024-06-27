
import styles from './YourImgDiary.module.css'

const DeleteModal = (props) =>{

    const deleteCancelHandler = props.deleteCancelHandler;
    const deletePostHandler = props.deletePostHandler;
    const postId = props.postId


    return (
      <div className={styles.modal_container}>
        <p className={styles.modal_p}>
          Möchtest du diesen Eintrag wirklich löschen?
        </p>
        <div className={styles.modal_div}>
          <button
            className={styles.delete_yes}
            onClick={() => deletePostHandler(postId)}
          >
            Ja
          </button>
          <button className={styles.delete_no} onClick={deleteCancelHandler}>
            Nein
          </button>
        </div>
      </div>
    );
}

export default DeleteModal;