//import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getBooksByTitle } from "../../redux/actions/actions";
const SearchBar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
      setSearch(e.target.value);
      dispatch(getBooksByTitle(search));
  };
  console.log(search);
  return (
    <nav>
      <input
        name="searchBar"
        type="search"
        placeholder="Search the book that you want"
        onChange={handleSearch}
      />
    </nav>
  );
};

export default SearchBar;
