//import React from 'react'
import { useEffect, useState } from "react";
import Books from "../PanelBooks/Books";
import { getAllBooks} from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./PopularBooks.module.css";

const PopularBooks = () => {
  const dispatch = useDispatch();
  const popularBooks = useSelector((state) => state.allBooks)
  const [currentPage, setCurrentPage] = useState(1);
  const [active, setActive] = useState(1);
  const [search,setSearch] = useState({
    "price": 0
  })
  useEffect(() => {
    dispatch(getAllBooks())
  }, []);

 

  return (
    <div className={styles.container}>
      
      <h2 className={styles.title}>Popular Books</h2>
      <div>
        <Books currentBooks={popularBooks} />
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default PopularBooks;