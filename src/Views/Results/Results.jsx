import React from 'react'
import { useEffect } from "react";
import Books from "../../Components/PanelBooks/Books";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks } from '../../redux/actions/actions';
import styles from './Results.module.css'
// import styles from "./Home.module.css";

function Results() {
    console.log("entrando");
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(getAllBooks());
      }, [dispatch]);

  const results = useSelector((state) => state.allBooksCopy);
  console.log(results);
  return (
    <div className={styles.container}>
        <Books allBooks={results} />
    </div>
  )
}

export default Results