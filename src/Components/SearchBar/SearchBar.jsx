//import React from "react";
import {useState} from 'react';
const SearchBar = ()=>{

    const [search, setSearch]= useState('');
    const handleSearch = (e)=>{
        e.preventDefault();
        setSearch(e.target.value)
    };
    return(
        <nav>
            <input name="searchBar" type="text" placeholder="Search the book that you want" value={search} onChange={handleSearch}  />
        </nav>
    )
}

export default SearchBar;