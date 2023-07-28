//import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooksByTitle, getGenres } from "../../redux/actions/actions";
import styles from './SearchBar.module.css'
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state)=> state.genres)
  const [search, setSearch] = useState({
  });
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getGenres())
  }, []);

  const handleChange = (e) => {
    console.log(e.target.value);
      setSearch({...search,
        title: e.target.value});
    };

    

  const handleSearch = (e) => {
    e.preventDefault()
    console.log(search);
    dispatch(getBooksByTitle(search));
    navigate(`/results/?title=${search.title}`)
    
  };

  const handleGenre = (e) => {
    e.preventDefault()
    console.log(e.target.value);
    if (e.target.value === "all genres") {
      
    }else 
      setSearch({...search,
        gender: e.target.value});
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && search.title.trim() !== "") {
      handleSearch(e);
    }
  };

  const getUniqueValues = (genres) => {
    const uniqueValuesSet = new Set();
  
    genres?.forEach((item) => {
      if (item.nameType) {
        uniqueValuesSet.add(item.nameType);
      }
    });
  
    return Array.from(uniqueValuesSet);
  };

  const uniqueGenders = getUniqueValues(genres);
  
  return (
    <nav className={styles.container}>
      {search.title === undefined && search.gender === undefined ?  (
        <button onClick={handleSearch} className={styles.icon} disabled>⌕</button>
      ) : (
        <button onClick={handleSearch} className={styles.icon}>⌕</button>
      )}

      <input
        name="searchBar"
        type="search"
        value={search.title}
        placeholder="Search the book that you want"
        onChange={handleChange}
        onKeyPress={handleKeyPress} 
        className={styles.bar}
      />
      <select className={styles.genres} onChange={handleGenre} defaultValue="all genres" name="genres">
            <option defaultValue value="all genres">
              all genres
            </option>
            {uniqueGenders?.map((genre) => {
              return <option key={genre} value={genre}>
              {genre}
            </option>
            })}
          </select>
    </nav>
  );
};

export default SearchBar;
