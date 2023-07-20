//import React from 'react'
import { useEffect } from 'react';
import Books from "../../Components/PanelBooks/Books";
import Slide from "../../Components/Slide/Slide"
import { getAllBooks } from '../../redux/actions/actions'
import { useDispatch, useSelector } from 'react-redux';
import styles from './Home.module.css'
//import Profile from "../../Views/Profile/Profile";

const Home = () => {

  const dispatch = useDispatch();
  const allBooks = useSelector(state => state.allBooksCopy);

  useEffect(() => {
    dispatch(getAllBooks());
    return (console.log('Desmontado!!'))
  }, [dispatch]);

  return (
    <div className={styles.container}>

      <div>
        <Slide books={allBooks} />
      </div>

      <div>
        <Books allBooks={allBooks} />
      </div>

    </div>
  );
};

export default Home;
