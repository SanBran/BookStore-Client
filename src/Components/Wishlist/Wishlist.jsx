//import React from 'react'

import { useDispatch, useSelector } from "react-redux";
import Book from "../CardBook/Book";
import styles from "./Wishlist.module.css";
import { useEffect, useState } from "react";
import { getBooksById, getUserById } from "../../redux/actions/actions";

function Wishlist() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userDetail);

  const listWish2 = [{
    "id": "6608837f-2e33-4089-aafe-d72fb77b9923",
    "title": "Abeloff. Oncología clínica",
    "author": "John E. Niederhuber, James O. Armitage, James H Doroshow, Michael B. Kastan, Joel E. Tepper",
    "country": "AR",
    "language": "es",
    "image": "http://books.google.com/books/content?id=C9U6EAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    "gender": "Medical",
    "sinopsis": "Presenta de manera muy completa y equilibrada entre ciencias básicas y perspectiva clínica los conocimientos más actuales en la especialidad. Pone especial énfasis en la biología del cáncer, anatomía patológica, diagnóstico, tratamiento, pronóstico, rehabilitación y prevención. Cada capítulo se abre con los puntos clave Tiene un fuerte contenido visual que lo distingue de los demás productos que están en el mercado. Explica al lector cómo seleccionar las pruebas diagnósticas más adecuadas. Muestra cómo se están aplicando en la práctica diaria las últimas investigaciones. Su práctico formato permite acceder al contenido más completo en cualquier momento y en cualquier lugar a través de ExpertConsult.",
    "price": 41456.12,
    "publishedDate": "2020-04-15",
    "pdfLink": "http://books.google.com.ar/books?id=C9U6EAAAQBAJ&printsec=frontcover&dq=%22%22&hl=&cd=37&source=gbs_api",
    "status": true,
    "editorial": "Elsevier Health Sciences",
    "numPages": 0,
    "createdAt": "2023-07-20T15:49:40.593Z",
    "updatedAt": "2023-07-20T15:49:40.593Z",
    "deletedAt": null,
    "userId": null,
    "payId": null,
    "comments": []
  },
  {
    "id": "ec5b7ef1-878f-4643-9375-b5e44cde8337",
    "title": "Alcohólicos anónimos",
    "author": "Author not Available",
    "country": "AR",
    "language": "en",
    "image": "Image not Available",
    "gender": "Alcoholism",
    "sinopsis": "Sinopsis not available.",
    "price": 0,
    "publishedDate": "1955",
    "pdfLink": "http://books.google.com.ar/books?id=LmoyzwEACAAJ&dq=%22%22&hl=&cd=17&source=gbs_api",
    "status": true,
    "editorial": "Publisher not available",
    "numPages": 0,
    "createdAt": "2023-07-20T15:49:40.561Z",
    "updatedAt": "2023-07-20T15:49:40.561Z",
    "deletedAt": null,
    "userId": null,
    "payId": null,
    "comments": []
  },
  {
    "id": "030e3da0-2be0-40f9-899b-327644ae0fa0",
    "title": "Aragon reyno de Christo, y dote de Maria Santissima",
    "author": "Roque Alberto Faci",
    "country": "AR",
    "language": "es",
    "image": "http://books.google.com/books/content?id=8ERFrYv9VAIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    "gender": "Gender not Available",
    "sinopsis": "Sinopsis not available.",
    "price": 0,
    "publishedDate": "1750",
    "pdfLink": "http://books.google.com.ar/books?id=8ERFrYv9VAIC&printsec=frontcover&dq=%22%22&hl=&cd=3&source=gbs_api",
    "status": true,
    "editorial": "Publisher not available",
    "numPages": 0,
    "createdAt": "2023-07-20T15:49:40.529Z",
    "updatedAt": "2023-07-20T15:49:40.529Z",
    "deletedAt": null,
    "userId": null,
    "payId": null,
    "comments": []
  },];

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
