//import React from 'react'
import { useEffect, useState } from "react";
import Books from "../../Components/PanelBooks/Books";
import Slide from "../../Components/Slide/Slide";
import { getAllBooks, getUserById} from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Home.module.css";
import Pagination from "../../Components/Pagination/Pagination";
//import Profile from "../../Views/Profile/Profile";

const Home = () => {
  const dispatch = useDispatch();
  const allBooks = useSelector((state) => state.allBooks);
  const totalPages = useSelector((state)=> state.booksObject)
  const user = useSelector((state) => state.access);


 

  const [currentPage, setCurrentPage] = useState(1);
  const [active, setActive] = useState(1);

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  useEffect(() => {
    if (user.ref !== "") {
      dispatch(getUserById(user.ref));
    }
  }, [dispatch, user.ref]);

  return (
    <div className={styles.container}>
      <div>
        <Slide books={allBooks} />
      </div>
      <h2 className={styles.title}>New Arrivals</h2>
      <div>
        <Books currentBooks={allBooks} />
      </div>
      <div className={styles.paginationContainer}>
        <Pagination
          numBooks={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          active={active}
          setActive={setActive}
          filter={false}/>
          
      </div>
    </div>
  );
};

export default Home;
