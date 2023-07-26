//import React from 'react'
import { useEffect, useState } from "react";
import Books from "../../Components/PanelBooks/Books";
import Slide from "../../Components/Slide/Slide";
import { getAllBooks, listWish } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Home.module.css";
import Wishlist from "../../Components/Wishlist/Wishlist";
import Pagination from "../../Components/Pagination/Pagination";
//import Profile from "../../Views/Profile/Profile";

const Home = () => {
  const dispatch = useDispatch();
  const allBooks = useSelector((state) => state.allBooks);
  const totalPages = useSelector((state)=> state.booksObject)
  const showListWishlist = useSelector((state) => state.showListwish);


 

  const [currentPage, setCurrentPage] = useState(1);
  const [active, setActive] = useState(1);
useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listWish(false));
  }, [dispatch]);

 

  return (
    <div className={styles.container}>
      <div>
        <Slide books={allBooks} />
      </div>
      <h2 className={styles.title}>New Arrivals</h2>
      <div>
        {showListWishlist ? (
          <Wishlist />
        ) : (
          <Books currentBooks={allBooks} />
        )}
      </div>
      <div className={styles.paginationContainer}>
        <Pagination
          numBooks={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          active={active}
          setActive={setActive}
          filter={false}/>
          
      </div>
    </div>
  );
};

export default Home;
