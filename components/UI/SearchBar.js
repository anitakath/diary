import { useState } from 'react';


//STYLES

import styles from '../../styles/UI/SearchBar.module.css'

const SearchBar = () =>{

  const [expanded, setExpanded] = useState(false);

  const handleSearchClick = () => {
    setExpanded(!expanded);
  };


  console.log(expanded)



  return (
    <div className={styles.search_container}>
      <div className={styles.search_div}>
        <input
          type="search"
          placeholder="SEARCH"
          className={styles.searchInput}
        ></input>

        <button  onClick={handleSearchClick} className={styles.search_btn}> 🚀 </button>
      </div>
    </div>
  );
}

export default SearchBar;