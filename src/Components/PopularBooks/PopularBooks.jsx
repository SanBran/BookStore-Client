//import React from 'react'
import { useEffect, useState } from "react";
import Books from "../PanelBooks/Books";
import { getComents} from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./PopularBooks.module.css";
import Book from "../CardBook/Book";

const PopularBooks = () => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments)
  const ratingBooks = []
  const fiveStar = []
  const [currentPage, setCurrentPage] = useState(1);
  const [active, setActive] = useState(1);
 
  useEffect(() => {
    dispatch(getComents())
  }, []);

  comments?.map(r => {
    if (r.rating === 5) {
      
        ratingBooks.push(r.books)
    }
    
  })

  
  

 

  return (
    <div className={styles.container}>
      
      <h2 className={styles.title}>Popular Books</h2>
      <div>
        <Books currentBooks={ratingBooks} />
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default PopularBooks;