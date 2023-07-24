import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks,FilterByPriceRange} from "../../redux/actions/actions";
import Pagination from "../Pagination/Pagination";
import styles from './Filters.module.css'
import Books from "../PanelBooks/Books";

const Filters = () => {
  const currentBooks = useSelector((state) => state.allBooksCopy);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    gender: "",
    editorial: "",
    publishedDate: "",
    country: "",
    language: "",
    pages: "",
    price: "",
  });
  const [priceMax, setPriceMax] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [allBooks, setallBooks] = useState([]);

  // Este useEffect se ejecuta cuando se monta el componente para traer data del estado Global
  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  // este useEfect se ejecuta para llenar el estado local
  useEffect(() => {
    setallBooks(currentBooks);
  }, [currentBooks]);

  console.log(currentBooks);
  const handlePriceMin = (event) => {
    event.preventDefault();
    const priceRange = event.target.value;

    setPriceMin(priceRange);
  };

  const handlePriceMax = (event) => {
    event.preventDefault();
    const priceRange = event.target.value;

    setPriceMax(priceRange);
  };

  const handleFilter = async (event) => {

    const sendBody = {
      priceRange: `${priceMin}-${priceMax}`,
    };

     const filteredBooks = allBooks.filter((book) => {
    const bookPrice = parseFloat(book.price);
    return !isNaN(bookPrice) && bookPrice >= priceMin && bookPrice <= priceMax;
  });


  if(filteredBooks.length === 0){
alert("No hay libros en ese rango de precio")
  }
   dispatch(FilterByPriceRange(filteredBooks));
    
  
   } 

  const handleData = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });

    
  };

  const handleFilterData = async (event) => {
    if (
      !data.gender &&
      !data.editorial &&
      !data.publishedDate &&
      !data.country &&
      !data.language &&
      !data.pages &&
      !data.price
    ) {
      setallBooks(currentBooks);
      return;
    }

    const sendBody = {};

    if (data.gender) {
      sendBody.gender = data.gender;
    }
    if (data.editorial) {
      sendBody.editorial = data.editorial;
    }
    if (data.publishedDate) {
      sendBody.publishedDate = data.publishedDate;
    }
    if (data.country) {
      sendBody.country = data.country;
    }
    if (data.language) {
      sendBody.language = data.language;
    }
    if (data.pages) {
      sendBody.pages = data.pages;
    }

    if (data.gender) {
      const filteredBooks = allBooks.filter(
        (Book) => Book.gender === data.gender
      );
     setallBooks(filteredBooks);
      
    }

    if (data.editorial) {
      const filteredBooks = allBooks.filter(
        (Book) => Book.editorial === data.editorial
      );
      setallBooks(filteredBooks);
    }
    if (data.publishedDate) {
      const filteredBooks = allBooks.filter(
        (Book) => Book.publishedDate === data.publishedDate
      );
      setallBooks(filteredBooks);
    }
    if (data.country) {
      const filteredBooks = allBooks.filter(
        (Book) => Book.country === data.country
      );
      setallBooks(filteredBooks);
    }
    if (data.language) {
      const filteredBooks = allBooks.filter(
        (Book) => Book.language === data.language
      );
      setallBooks(filteredBooks);
    }
    if (data.pages) {
      const filteredBooks = allBooks.filter(
        (Book) => Book.pages === data.pages
      );
      setallBooks(filteredBooks);
    }

    if (!data.gender && !data.editorial && !data.publishedDate && !data.country && !data.language && !data.pages && !data.price) {
      setallBooks(currentBooks);
    }
   
    };

     const handleCleanFilter = () => {
      setData({
        gender: "",
        editorial: "",
        publishedDate: "",
        country: "",
        language: "",
        price: "",
      });
      setPriceMin("");
    setPriceMax("");
    setallBooks(currentBooks);
      }

      const getUniqueValues = (data, key) => {
        const uniqueValuesSet = new Set();
      
        data?.forEach((item) => {
          if (item[key]) {
            uniqueValuesSet.add(item[key]);
          }
        });
      
        return Array.from(uniqueValuesSet);
      };

      const uniqueGenders = getUniqueValues(allBooks, "gender");
      const uniqueEditorial = getUniqueValues(allBooks, "editorial");
      const uniquePublishedDate = getUniqueValues(allBooks, "publishedDate");
      const uniqueCountry = getUniqueValues(allBooks, "country");
      const uniqueLanguage = getUniqueValues(allBooks, "language");
      const uniquePrice = getUniqueValues(allBooks, "price");

      console.log(data);
      
    return (
      <div className={styles.masterContainer}>
        <div className={styles.container}>
        <div className={styles.filters}>
          <h1 className={styles.filterTitle}>Filters</h1>

          <select onChange={handleData} defaultValue="Gender" name="gender">
            <option defaultValue value="">
              Genre
            </option>
            {uniqueGenders?.map((genre) => {
              return <option key={genre} value={genre}>
              {genre}
            </option>
            })}
          </select>
          <select onChange={handleData} defaultValue="Editorial" name="editorial">
            <option defaultValue value="">
              Editorial
            </option>
            {uniqueEditorial?.map((editorial) => {
              return <option key={editorial} value={editorial}>
              {editorial}
            </option>
            })}
          </select>
          <select onChange={handleData} defaultValue="Published Date" name="publishedDate">
            <option defaultValue value="">
              Published-Date
            </option>
            {uniquePublishedDate?.map((date) => {
              return <option key={date} value={date}>
              {date}
            </option>
            })}
          </select>
          <select onChange={handleData} defaultValue="Country" name="country">
            <option defaultValue value="">
              Country
            </option>
            {uniqueCountry?.map((country) => {
              return <option key={country} value={country}>
              {country}
            </option>
            })}
          </select>
          <select onChange={handleData} defaultValue="Language" name="language">
            <option defaultValue value="">
              Language
            </option>
            {uniqueLanguage?.map((language) => {
              return <option key={language} value={language}>
              {language}
            </option>
            })}
          </select>
          
          <select onChange={handleData} defaultValue="Price" name="price">
            <option defaultValue value="">
              Price
            </option>
            {uniquePrice?.map((price) => {
              return <option key={price} value={price}>
              {price}
            </option>
            })}
          </select>
          <button
            className={styles.btnFilter}
            type="submit"
            placeholder="Filtrar"
            onClick={() => handleFilterData()}
          >Apply</button>
          <button
            className={styles.btnCleanFilter}
            type="reset"
            placeholder="Limpiar Filters"
            onClick={() => handleCleanFilter()}
          >Clean</button>
          <input
            name="price"
            placeholder="Min"
            value={priceMin}
            type="text"
            onChange={handlePriceMin}
          />
          <input
            name="price"
            placeholder="Max"
            value={priceMax}
            type="text"
            onChange={handlePriceMax}
          />
          <button
            className={styles.btnRangePrice}
            type="submit"
            placeholder="Filtrar"
            onClick={() => handleFilter()}
          >Filter price</button>
        </div>

        <div className={styles.bookContainer}>

          {currentBooks.length == 0? <h2 className={styles.noResults}>No results</h2>: <Books currentBooks={allBooks}/>}
          
        </div>
        </div>
        <Pagination/>
      </div>
    );
  };


export default Filters;
