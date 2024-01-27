


//STYLES
import styles from "../../styles/Header/Header.module.css";

const SearchBar = () =>{


    return (
      <div className={styles.search_container}>

        <input
          type="search"
          placeholder="SEARCH"
          className={styles.searchInput}
        ></input>

        <button className={styles.search_btn}> 🚀 </button>
      </div>
    );
}

export default SearchBar;