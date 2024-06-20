
import styles from './NewImages.module.css'
import Image from 'next/image'

const UserImageField  = (props) =>{


    const handleImageChange = props.handleImageChange
    const imageInput = props.imageInput
    const handlePickClick = props.handlePickClick
    const pickedImage = props.pickedImage
    const resizeImgHandler = props.resizeimghandler
    const isResized = props.isResized;

    return (
      <div
        className={`${styles.usersImage_div}  ${
          isResized ? styles.resized : ""
        }`}
      >
        <input
          type="file"
          onChange={handleImageChange}
          className={styles.file_input}
          ref={imageInput}
        />
        <button
          type="button"
          className={styles.file_btn}
          onClick={handlePickClick}
        >
          + Foto
        </button>

        <div className={styles.preview}>
          {pickedImage && (
            <Image
              src={pickedImage}
              onClick={resizeImgHandler}
              alt="picked image"
              width={200}
              height={200}
              className={styles.image}
            ></Image>
          )}
        </div>
      </div>
    );
}

export default UserImageField