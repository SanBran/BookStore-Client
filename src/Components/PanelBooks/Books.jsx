//import React from 'react';
//import { useState } from 'react';
import Book from '../CardBook/Book';
import styles from './Books.module.css'

const Books = ({ currentBooks }) => {


return(
  
    <div className={styles.booksContainer}>

      {currentBooks?.map(books => <Book key={books.id} books={books} />)}
    </div>


  )
}

export default Books;
