//import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getBooksByTitle } from "../../redux/actions/actions";
import styles from './SearchBar.module.css'
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [placeHolder, setPlaceHolder] = useState("Search the book that you want")
  const [search, setSearch] = useState({
    title:""
  });
  const navigate = useNavigate()


  const handleChange = (e) => {
      setSearch({title: e.target.value});
    };

    

  const handleSearch = (e) => {
    e.preventDefault()
    dispatch(getBooksByTitle(search));
    navigate("/Results")
    setSearch({
      title: ""
    });;
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && search.title.trim() !== "") {
      handleSearch(e);
    }
  };


  
  return (
    <nav className={styles.container}>
      {search.title === "" ? (
        <button onClick={handleSearch} className={styles.icon} disabled>⌕</button>
      ) : (
        <button onClick={handleSearch} className={styles.icon}>⌕</button>
      )}

      <input
        name="searchBar"
        type="search"
        value={search.title}
        placeholder={placeHolder}
        onChange={handleChange}
        onKeyPress={handleKeyPress} 
        className={styles.bar}
      />
    </nav>
  );
};

export default SearchBar;
