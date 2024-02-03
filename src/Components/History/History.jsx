//import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import styles from "./Histoy.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Empty from "../../Views/Empty/Empty";


function History() {
  const genericCover = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhRKhJb1aLmjwGX_ox0TA6eTxCv_5g3Nlr6w&usqp=CAU";

  const dispatch = useDispatch();
  const payments = useSelector((state) => state.payments);

  const [books, setBooks] = useState([]);

  useEffect(() => {
    console.log("pagos: ", payments);
    const getBooks = async () => {
      const books = payments.flatMap((payment) =>
        payment.books.map((book) => book)
      );
      setBooks(books);
    };
    getBooks();
  }, [payments, dispatch]);

  const handleDownload = (downloadLink) => {
    const link = document.createElement("a");
    link.href = downloadLink;
    link.download = "fileName" || "archivo"; // Nombre del archivo a descargar
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  console.log("libros: ", books);
  return (
    <div className={styles.booksContainer}>
      <h2 className={styles.title2}>History </h2>
      <div className={styles.book}>
        {books.length
        ?(<>
        {books.map((book) => (
          <div key={book.id + 5} className={styles.container}>
            <Link className={styles.image} to={`/detail/${book.id}`}>
              <img
                className={styles.imageSize}
                src={book.image !== "Image not Available" ? book.image : genericCover}
                alt={`${book.title} from ${book.author}`}
              />
            </Link>
            <div className={styles.textContainer}>
              <div className={styles.title}>{book.title}</div>
              <div className={styles.author}>{book.author}</div>
              {book.price && book.price 
              ?(<div className={styles.price}>${book.price}</div>) 
              :(<div className={styles.price}>Free</div>)}
              <button
                className={styles.downloadBtn}
                onClick={() => handleDownload(book.pdfLink)}
              >
                ⬇️
              </button>
            </div>
          </div>
        ))}
        </>)
        :(<Empty/>)
      }
      </div>
    </div>
  );
}

export default History;
