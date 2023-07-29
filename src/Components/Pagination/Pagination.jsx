import React from 'react'
import styles from './Pagination.module.css'
import { selectPage } from '../../redux/actions/actions'
import { useDispatch } from 'react-redux'

function Pagination({numBooks, setCurrentPage, currentPage, active, setActive,filter}) {


  const dispatch = useDispatch()
  let nums = 0
  const pageNumbers = []
  if (filter) {
    nums = numBooks
  }else {
    nums = Math.ceil(numBooks/9) 
  }

   
    
    for (let i = 1; i <= nums; i++) {
      pageNumbers.push(i)
      
    } 
    
    const getBooks = async (page) => {   
          dispatch(selectPage(page));
              
      }

    const nextPage = () => {
        setCurrentPage(currentPage + 1)
        setActive(currentPage + 1)
        getBooks(currentPage + 1)
    }

    const prevPage = () => {
        setCurrentPage(currentPage - 1)
        setActive(currentPage - 1)
        getBooks(currentPage - 1)
    }

    const specificPage = (n) => {
        setCurrentPage(n)
        setActive(n)
        getBooks(n)
    }

    const renderPageNumbers = () => {
      const maxVisiblePageNumbers = 5;
                                
      const startIndex = Math.max(currentPage - Math.floor(maxVisiblePageNumbers), 0);
      const endIndex = Math.min(startIndex + maxVisiblePageNumbers, nums);
    
      const visiblePageNumbers = pageNumbers.slice(startIndex, endIndex);
    

        return visiblePageNumbers.map((page, index) => (
            <div
              value={page}
              className={active === page ? styles.active : styles.page}
              key={index}
              onClick={() => specificPage(page)}
            >
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


