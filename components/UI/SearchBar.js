import { useState } from 'react';


//STYLES

import styles from '../../styles/UI/SearchBar.module.css'

const SearchBar = () =>{

  const [expanded, setExpanded] = useState(false);

  const [searchValue, setSearchValue] = useState('')

  const handleSearchClick = () => {
    if (expanded && searchValue.trim() !== "") {
      // Führe hier die Suchaktion aus
      console.log("Suche nach: ", searchValue);
    } else {
      setExpanded(!expanded);
    }
  };

  return (
    <div className={styles.search_container}>
      <div className={styles.search_div}>
        <input
          type="search"
          placeholder="SEARCH"
          className={styles.searchInput}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        ></input>

        <button onClick={handleSearchClick} className={styles.search_btn}>
          {" "}
          🚀{" "}
        </button>
      </div>
    </div>
  );
}

export default SearchBar;