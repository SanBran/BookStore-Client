//import React from 'react'
import { useEffect } from 'react';
//import styles from "./Home.module.css"
import Books from "../../Components/PanelBooks/Books";
import SearchBar from "../../Components/SearchBar/SearchBar";
import Navbar from '../../Components/Navbar/Navbar';
import {getAllBooks} from '../../redux/actions/actions'
import {useDispatch, useSelector} from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();
  const allBooks = useSelector(state=> state.allBooks);

  useEffect(()=>{
    dispatch(getAllBooks());

    return(console.log('Desmontado!!'))
  }, [dispatch]);

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
        <Books allBooks={allBooks}/>
      </div>
    </div>
  );
};

export default Home;
