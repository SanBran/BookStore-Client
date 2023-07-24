//import React from 'react';
//import { useState } from 'react';
import Book from '../CardBook/Book';
import styles from './Books.module.css'

const Books = ({ currentBooks }) => {

  console.log(currentBooks);
  return (

    <div className={styles.booksContainer}>

      {currentBooks?.map(books => <Book key={books.id} books={books} />)}
    </div>


  )
}

export default Books;

/* {
   "title": "El candidato de Dios",
    "author": [
      "Luis G. Basurto"
    ],
    "image": "http://books.google.com/books/content?id=vQHmAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
  } */