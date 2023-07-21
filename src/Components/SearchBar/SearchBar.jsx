//import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getBooksByTitle } from "../../redux/actions/actions";
import styles from './SearchBar.module.css'
//import FilterAuthor from "../Filter/FilterAuthor";
const SearchBar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
      setSearch(e.target.value);
      dispatch(getBooksByTitle(search));
  };
  return (
    <nav className={styles.container}>
      <button className={styles.icon}>⌕</button>
      <input
        name="searchBar"
        type="search"
        placeholder="Search the book that you want"
        onChange={handleSearch}
        className={styles.bar}
      />
    </nav>
  );
};

export default SearchBar;
