//import React from 'react'
import { useEffect, useState } from "react";
import Books from "../PanelBooks/Books";
import { getBooksByPrice} from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./FreeBooks.module.css";
import PaginationPrice from "../Pagination/PaginationPrice";

const FreeBooks = () => {
  const dispatch = useDispatch();
  const freeBooks = useSelector((state) => state.allBooksPrice)
  const num = useSelector((state) => state.priceBooksObject)
  const [currentPage, setCurrentPage] = useState(1);
  const [active, setActive] = useState(1);
  const [search,setSearch] = useState({
    "price": 0
  })
  useEffect(() => {
    dispatch(getBooksByPrice(search))
  }, []);

 

  return (
    <div className={styles.container}>
      
      <h2 className={styles.title}>Free Books</h2>
      <div>
        <Books currentBooks={freeBooks} />
      </div>
      <div>
        <PaginationPrice
        numBooks={num}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        active={active}
        setActive={setActive}
        body={search}/>
      </div>
    </div>
  );
};

export default FreeBooks;