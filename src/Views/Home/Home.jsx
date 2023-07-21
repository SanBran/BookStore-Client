//import React from 'react'
import { useEffect } from "react";
import Books from "../../Components/PanelBooks/Books";
import Slide from "../../Components/Slide/Slide";
import { getAllBooks } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Home.module.css";
import Wishlist from "../../Components/Wishlist/Wishlist";
//import Profile from "../../Views/Profile/Profile";

const Home = () => {
  const dispatch = useDispatch();
  const allBooks = useSelector((state) => state.allBooks);
  const showListWishlist = useSelector((state) => state.showListwish);
  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);
  return (
    <div className={styles.container}>
      <div>
        <Slide books={allBooks} />
      </div>
      <h2 className={styles.title}>New Arrivals</h2>
      <div>
        {showListWishlist ? <Wishlist /> : <Books allBooks={allBooks} />}
      </div>
    </div>
  );
};

export default Home;
