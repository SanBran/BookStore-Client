//import React from 'react'

import { useDispatch, useSelector } from "react-redux";
import Book from "../CardBook/Book";
import styles from "./Wishlist.module.css";
import { useEffect, useState } from "react";
import { getBooksById, getUserById } from "../../redux/actions/actions";

function Wishlist() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userDetailFav);

  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      if (!userInfo.listWish || userInfo.listWish.length === 0) {
        return [];
      }
      const promises = userInfo.listWish.map((id) => dispatch(getBooksById(id)));
      const resolvedBooks = await Promise.all(promises);
      const validBooks = resolvedBooks.filter((book) => book !== null);
      setBooks(validBooks);
    };

    getBooks();
  }, [userInfo.listWish, dispatch]);

 
  console.log(books)
  return (
    <div className={styles.booksContainer}>
      <h2 className={styles.title}>Wishlist</h2>
      {books.map((book) => (
        <Book key={(book.payload.id+2)} books={book.payload} />
      ))}
    </div>
  );
}

export default Wishlist;
