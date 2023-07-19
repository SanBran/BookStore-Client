import React, { useState, useEffect } from 'react';
import styles from './Slide.module.css';
import StarRating from '../StarRating/StarRating';

function Slide({ books }) {
  

  const [actualImage, setActualImage] = useState(0);
  const maxIndex = 40;
  const numberOfBooksToShow = 5;
  
  const randomIndices = Array.from({ length: numberOfBooksToShow }, () =>
  Math.floor(Math.random() * maxIndex)
  );
  
  const [selectBooks, setSelectBooks] = useState([]);
  useEffect(() => {
    const randomBooks = randomIndices.map(i => books[i]);
    setSelectBooks(randomBooks);
  }, [books]);
  const number = selectBooks?.length;

console.log(selectBooks);


  if (!Array.isArray(selectBooks) || number === 0) {
    return null;
  }

  const nextBook = () => {
    setActualImage(actualImage === number - 1 ? 0 : actualImage + 1);
  };

  const prevBook = () => {
    setActualImage(actualImage === 0 ? number - 1 : actualImage - 1);
  };

  return (
    <div className={styles.container}>
      <button className={styles.leftButton} onClick={prevBook}>〈</button>
      {selectBooks?.map((book, index) => {
        if (actualImage === index && book) {
          return (
            <div className={styles.bookContainer} key={index}>
              <img className={styles.background} src={book.image} alt="image" />
              <div className={styles.layout}></div>
              <div className={styles.bookInfo}>
              <img className={styles.image} src={book.image} alt="image" />
              <div className={styles.textContainer}>
              <h1 className={styles.title}>{book.title}</h1>
              <h2 className={styles.author}>{book.author}</h2>
              <StarRating/>
              </div>
              </div>
            </div>
          );
        }
        return null;
      })}
      <button className={styles.rightButton} onClick={nextBook}>〉</button>
    </div>
  );
}

export default Slide;