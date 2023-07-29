//import React from 'react'

import { useDispatch, useSelector } from "react-redux";
import Book from "../CardBook/Book";
import styles from "./Wishlist.module.css";
import { useEffect, useState } from "react";
import { getBooksById, getUserById } from "../../redux/actions/actions";

function Wishlist() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userDetail);

  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      if (!userData.listWish || userData.listWish.length === 0) {
        return [];
      }
      const promises = userData.listWish.map((id) => dispatch(getBooksById(id)));
      const resolvedBooks = await Promise.all(promises);
      const validBooks = resolvedBooks.filter((book) => book !== null);
      setBooks(validBooks);
    };

    getBooks();
  }, [userData.listWish, dispatch]);

  const removeBookFromWishlist = (id) => {
    // Filtrar el libro con el ID dado y actualizar el estado 'books'
    setBooks((prevBooks) => prevBooks.filter((book) => book.payload.id !== id));
  };
  console.log(books)
  return (
    <div className={styles.booksContainer}>
      <h2 className={styles.title}>Wishlist</h2>
      {books.map((book) => (
        <Book key={book.payload.id} books={book.payload} onRemove={removeBookFromWishlist} />
      ))}
    </div>
  );
}

export default Wishlist;
