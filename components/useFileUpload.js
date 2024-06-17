import { useRef } from "react";


import styles from '../styles/NewImage.module.cssw'
const useFileUpload = (customHandleImageChange, customHandlePickClick) => {
  const imageInput = useRef();

  const handlePickClickWrapper = () => {
    imageInput.current.click();
  };

  return (
    <>
      <input
        type="file"
        onChange={customHandleImageChange}
        className={styles.file_input}
        ref={imageInput}
      />
      <button
        type="button"
        className={styles.file_btn}
        onClick={handlePickClickWrapper}
      >
        + Foto
      </button>
    </>
  );
};

export default useFileUpload;
