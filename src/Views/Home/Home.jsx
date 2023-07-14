import React from 'react'
import styles from "./Home.module.css"
import Books from "../../Components/PanelBooks/Books";
import SearchBar from "../../Components/SearchBar/SearchBar";
import Navbar from '../../Components/Navbar/Navbar';


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
