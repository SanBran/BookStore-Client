//import React from 'react'
import { useEffect } from 'react';
import Books from "../../Components/PanelBooks/Books";
import SearchBar from "../../Components/SearchBar/SearchBar";
import Navbar from '../../Components/Navbar/Navbar';
import Slide from "../../Components/Slide/Slide"
import {getAllBooks} from '../../redux/actions/actions'
import {useDispatch, useSelector} from 'react-redux';
import styles from './Home.module.css'

const Home = () => {
  const dispatch = useDispatch();
  const allBooks = useSelector(state=> state.allBooks);

  useEffect(()=>{
    dispatch(getAllBooks());

    return(console.log('Desmontado!!'))
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div>
        <Slide books={allBooks}/>
      </div>
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
