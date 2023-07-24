import React, { useEffect, useState } from 'react';
import Books from "../../Components/PanelBooks/Books";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks } from '../../redux/actions/actions';
import Navbar from '../../Components/Navbar/Navbar';
import Filters from '../../Components/Filters/Filters';
import styles from './Results.module.css'

function Results() {
  const dispatch = useDispatch();
  const results = useSelector((state) => state.allBooksCopy);

  const resultsPerPage = 12; // Número de resultados a mostrar por página
  const totalPages = Math.ceil(results.length / resultsPerPage);

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const currentResults = results.slice(startIndex, endIndex);

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <Navbar/>
      </div>
      <Filters />
    </div>
  );
}

export default Results;