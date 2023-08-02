//import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import Book from "../CardBook/Book";
import styles from "./Histoy.module.css";
import { useEffect, useState } from "react";
import { getBooksById } from "../../redux/actions/actions";
import { Link } from "react-router-dom";

function History() {
  const dispatch = useDispatch();
  const payments = useSelector((state) => state.payments);

  const [books, setBooks] = useState([]);

  useEffect(() => {
    console.log("pagos: ", payments);
    const getBooks = async () => {
      if (!payments || payments.length === 0) {
        return;
      }
      const promises = payments.map((pay) =>
        pay.bookIds.map((id) => dispatch(getBooksById(id)))
      );
      console.log("promesa: ", promises);

      const resolvedBooks = await Promise.all(
        promises.map(async (promiseGroup) => await Promise.all(promiseGroup))
      );
      console.log("promesaResuelta: ", resolvedBooks);

      const validBooks = resolvedBooks.flat().filter((book) => book !== null);
      setBooks(validBooks);
    };

    getBooks();
  }, [payments, dispatch]);

  console.log("libros: ", books);
  return (
    <div className={styles.booksContainer}>
      <h2 className={styles.title2}>History </h2>
      {books.map((book) => (
       <div key={book.payload.id + 5} className={styles.container}>
       <Link className={styles.image} to={`/detail/${book.payload.id}`}>
         <img
           className={styles.imageSize}
           src={book.payload.image}
           alt={`${book.payload.title} from ${book.payload.author}`}
         />
       </Link>
 
       <div className={styles.textContainer}>
         <div className={styles.title}>{book.payload.title}</div>
         <div className={styles.author}>{book.payload.author}</div>
         {book.payload.price && book.payload.price ? (
           <div className={styles.price}>${book.payload.price}           
           </div>
         ) : (
           <div className={styles.price}>Free</div>
         )}
       </div>
     </div>
      ))}
    </div>
  );
}

export default History;
