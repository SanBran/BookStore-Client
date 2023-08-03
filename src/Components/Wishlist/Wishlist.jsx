//import React from 'react'

import { useSelector } from "react-redux";
import Book from "../CardBook/Book";
import styles from "./Wishlist.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

function Wishlist() {
  const userInfo = useSelector((state) => state.userDetail);

  const [books, setBooks] = useState([]);
  console.log("libros Id: ",userInfo.listWish)
  
  useEffect(() => {
    const getBooks = async () => {
      if (!userInfo.listWish || userInfo.listWish.length === 0) {
        return [];
      }
      try {
        const response = await axios.post(
          `bookDetail`,
          {
            "ids": userInfo.listWish
          }
        );
        const data = response.data;
        return data; // Devuelve directamente los datos obtenidos
      } catch (error) {
        throw new Error(error.message);
      }
    };

    // Invoca la función asincrónica y actualiza el estado de libros
    getBooks()
      .then((data) => setBooks(data))
      .catch((error) => console.error(error));
  }, [userInfo]);
 
  console.log("libros: ",books)
  return (
    <div className={styles.booksContainer}>
      <h2 className={styles.title}>Wishlist</h2>
      {books.map((book) => (
        <Book key={(book.id+2)} books={book} />
      ))}
    </div>
  );
}

export default Wishlist;
