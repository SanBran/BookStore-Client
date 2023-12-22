import {useRef} from 'react'
import { useEffect, useState } from "react";
import Books from "../../Components/PanelBooks/Books";
import Slide from "../../Components/Slide/Slide";
import { getAllBooks, getUserById, getGenres} from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Home.module.css";
import Pagination from "../../Components/Pagination/Pagination";
import Sidebar from "../../Components/Sidebar/Sidebar";
import NavbarNoLogo from '../../Components/Navbar/NavbarNoLogo'
import FreeBooks from "../../Components/FreeBooks/FreeBooks";
import PopularBooks from "../../Components/PopularBooks/PopularBooks";
//import Profile from "../../Views/Profile/Profile";

const Home = () => {
  const dispatch = useDispatch();
  const allBooks = useSelector((state) => state.allBooks);
  const totalPages = useSelector((state)=> state.booksObject)
  const user = useSelector((state) => state.access);

  const [currentPage, setCurrentPage] = useState(1);
  const [active, setActive] = useState(1);
  const [select, setSelect] = useState("New")

  const scrollNewRef = useRef(null);
  const scrollPopularRef = useRef(null);
  const scrollFreeRef = useRef(null);
 
  const scrollToNewArraivals = () => {
    if (scrollNewRef.current) {
      setSelect("New")
      scrollNewRef.current.scrollIntoView({
        behavior: 'smooth', // Opciones: 'auto', 'smooth'
        block: 'start',     // Opciones: 'start', 'center', 'end', 'nearest'
      });
    }
  };
  const scrollToPopular = () => {
    if (scrollPopularRef.current) {
      setSelect("Popular")
      scrollPopularRef.current.scrollIntoView({
        behavior: 'smooth', // Opciones: 'auto', 'smooth'
        block: 'start',     // Opciones: 'start', 'center', 'end', 'nearest'
      });
    }
  };
  const scrollToFree = () => {
    if (scrollFreeRef.current) {
      setSelect("Free")
      scrollFreeRef.current.scrollIntoView({
        behavior: 'smooth', // Opciones: 'auto', 'smooth'
        block: 'start',     // Opciones: 'start', 'center', 'end', 'nearest'
      });
    }
  };

  

  useEffect(() => {
    dispatch(getAllBooks());
 
    dispatch(getGenres())
  }, [dispatch]);

  useEffect(() => {
    if (user.ref !== "") {
      dispatch(getUserById(user.ref));
    }
  }, [dispatch, user.ref]);

  return (
    <div  className={styles.container}>
      
      <NavbarNoLogo/>
      <div className={styles.sidebar}>
        <Sidebar     
        scrollToNewArraivals={scrollToNewArraivals} 
        scrollToPopular={scrollToPopular} 
        scrollToFree={scrollToFree}
        select={select} />
      </div>
      <div className={styles.slide}>
        <Slide books={allBooks} />
      </div>
      <h2 className={styles.title}>New Arrivals</h2>
      <div ref={scrollNewRef} id='newArraivals' className={styles.books}>
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
      <div ref={scrollPopularRef} id='Popular'>
        <PopularBooks/>
      </div>
      <div ref={scrollFreeRef} id='Free'>
        <FreeBooks/>
      </div>
    </div>
  );
};

export default Home;
