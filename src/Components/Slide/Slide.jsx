import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Slide.module.css';
import StarRating from '../StarRating/StarRating';

function Slide({ books }) {


  const [actualImage, setActualImage] = useState(0);
  const maxIndex = 10;
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


  if (!Array.isArray(selectBooks) || number === 0) {
    return null;
  }

  const nextBook = () => {
    setActualImage(actualImage === number - 1 ? 0 : actualImage + 1);
  };

  const prevBook = () => {
    setActualImage(actualImage === 0 ? number - 1 : actualImage - 1);
  };

  const genericCover = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhRKhJb1aLmjwGX_ox0TA6eTxCv_5g3Nlr6w&usqp=CAU"


  return (
    <div className={styles.container}>
      <button className={styles.leftButton} onClick={prevBook}>〈</button>
      {selectBooks?.map((book, index) => {
        if (actualImage === index && book) {
          return (
            <div className={styles.bookContainer} key={index}>
              <img className={styles.background} src={book.image !== 'Image not Available' ? book.image : genericCover} alt="image" />
              <div className={styles.layout}></div>
              <div className={styles.bookInfo}>
                <Link className={styles.image} to={`/detail/${book.id}`}>
                  <img className={styles.image} src={book.image !== 'Image not Available' ? book.image : genericCover} alt="image" />
                </Link>
                <div className={styles.textContainer}>
                  <h1 className={styles.title}>{book.title}</h1>
                  <h2 className={styles.author}>{book.author !== 'Author not Available' ? book.author : ''}</h2>
                  <StarRating rating={book.comments} />
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