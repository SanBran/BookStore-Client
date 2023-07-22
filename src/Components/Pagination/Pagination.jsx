import React from 'react'
import styles from './Pagination.module.css'

function Pagination({numBooks, booksPerPage, paginationSize, currentPage, setCurrentPage, active, setActive}) {

    const pageNumbers = []
    
    for (let i = 1; i <= numBooks/booksPerPage; i++) {
        pageNumbers.push(i)
        
    } 

    const nextPage = () => {
        setCurrentPage(currentPage + 1)
        setActive(currentPage + 1)
    }

    const prevPage = () => {
        setCurrentPage(currentPage - 1)
        setActive(currentPage - 1)
    }

    const specificPage = (n) => {
        setCurrentPage(n)
        setActive(n)
    }

    const renderPageNumbers = () => {
        const visiblePageNumbers = pageNumbers.slice(
          Math.max(currentPage - 3, 0),
          Math.min(currentPage + 3, pageNumbers.length)
        );


        return visiblePageNumbers.map((page, index) => (
            <div
              value={page}
              className={active === page ? styles.active : styles.page}
              key={index}
              onClick={() => specificPage(page)}
            >
              {page}
            </div>
          ));
        };
  
        return (
          <div className={styles.container}>
            {currentPage > 1 ? (
              <button className={styles.Previous} onClick={prevPage}>
                〈
              </button>
            ) : (
              <button className={styles.disPrevious}>〈</button>
            )}
            {renderPageNumbers()}
            {currentPage < pageNumbers.length ? (
              <button className={styles.Next} onClick={nextPage}>
                〉
              </button>
            ) : (
              <button className={styles.disNext}>〉</button>
            )}
          </div>
        );
}

export default Pagination


// import React from 'react'
// import { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { selectPage } from '../../redux/actions/actions';
// import styles from './Pagination.module.css'

// function Pagination({allBooks,}) {

//     const [currentPage, setCurrentPage] = useState(1);
//   const [active, setActive] = useState(1);

  
// console.log(allBooks);

// const dispatch = useDispatch()
  

//   const lastIndex = 

//   useEffect(() => {
//     dispatch(selectPage(currentPage));    

//   }, []);
  

 

    
// return (
//     <div className={styles.container}>
//       {currentPage > 1 ? (
//         <div className={styles.Previous} >
//           PREVIOUS
//         </div>
//       ) : (
//         <div className={styles.disPrevious}>PREVIOUS</div>
//       )}
      
//         <div className={styles.Next} >
//           NEXT
//         </div>
     
//     </div>
//   );
// }

// export default Pagination

// Componente en el front-end que muestra los libros paginados

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const BookList = () => {
//   const [books, setBooks] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);

//   const getBooks = async (page) => {
//     try {
//       const response = await axios.get(`/api/books?page=${page}`);
//       setBooks(response.data.books);
//       setTotalPages(response.data.totalPages);
//     } catch (error) {
//       console.error('Error fetching books:', error);
//     }
//   };

//   useEffect(() => {
//     getBooks(currentPage);
//   }, [currentPage]);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   return (
//     <div>
//       {books.map((book) => (
//         <div key={book.id}>
//           <h2>{book.title}</h2>
//           {/* Mostrar otros detalles del libro */}
//         </div>
//       ))}
//       <div>
//         <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
//         <span>{currentPage} / {totalPages}</span>
//         <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
//       </div>
//     </div>
//   );
// };

// export default BookList;