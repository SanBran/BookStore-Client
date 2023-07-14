//import React from 'react'
import Books from "../Components/Book";
import SearchBar from "../Components/SearchBar";
import Navbar from '../Components/Navbar';
const Home = () => {
  return (
    <div>
      Home
      <div>
        <Navbar/>
      </div>
      <div>
        <SearchBar />
      </div>
      <div>
        <Books />
      </div>
    </div>
  );
};

export default Home;
