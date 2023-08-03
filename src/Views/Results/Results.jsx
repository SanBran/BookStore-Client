import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getBooksByTitle,FilterByPriceRange, getGenres,getEditorials,getAuthors,getCountries,getLanguages,getPublishedDates} from "../../redux/actions/actions";
import PaginationSearch from "../../Components/Pagination/PaginationSearch";
import styles from './Results.module.css'
import Books from "../../Components/PanelBooks/Books";

const Results = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search);
  const origin = searchParams.get("title");
  const [search, setSearch] = useState({
    title: origin
  });
 
  const currentBooks = useSelector((state) => state.allBooksCopy);
  const totalPages = useSelector((state) => state.booksObject)
  const genres = useSelector((state)=> state.genres)
  const editorials = useSelector((state)=> state.editorials)
  const countries = useSelector((state)=> state.countries)
  const languages = useSelector((state)=> state.languages)
  const publishedDates = useSelector((state)=> state.publishedDates)
  const dispatch = useDispatch();
  const [data, setData] = useState({
    title: origin
  });

  useEffect(() => {
    dispatch(getGenres())
    dispatch(getEditorials())
    dispatch(getPublishedDates())
    dispatch(getCountries())
    dispatch(getLanguages())
  }, []);
  
  const [priceMax, setPriceMax] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [allBooks, setallBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [active, setActive] = useState(1);

  // este useEfect se ejecuta para llenar el estado local
  useEffect(() => {
    currentBooks
    ? setallBooks(currentBooks)
    : setallBooks([])
  }, [currentBooks]);

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

  const handleData = async(event) => {
    const { name, value } = event.target;
    console.log(name, value);
    await setSearch({
      ...search,
      [name]: value,
    });
    
  };

  useEffect(() => {
    dispatch(getBooksByTitle(search));
    console.log(search);
  }, [search, dispatch]);

  const handleCleanFilter = () => {
       
      setPriceMin("");
    setPriceMax("");
    dispatch(getBooksByTitle(data));
    
  }

      const uniqueGenres = []
      const uniqueEditorial = []
      const uniquePublishedDate = []
      const uniqueCountry = []
      const uniqueLanguage = []

      genres?.map((genre) => uniqueGenres.includes(genre.nameType)? null : uniqueGenres.push(genre.nameType) )
      editorials?.map((editorial) => uniqueEditorial.includes(editorial.nameType)? null : uniqueEditorial.push(editorial.nameType) )
      publishedDates?.map((publishedDate) => uniquePublishedDate.includes(publishedDate.nameType)? null : uniquePublishedDate.push(publishedDate.nameType) )
      countries?.map((country) => uniqueCountry.includes(country.nameType)? null : uniqueCountry.push(country.nameType) )
      languages?.map((languages) => uniqueLanguage.includes(languages.nameType)? null : uniqueLanguage.push(languages.nameType) )
      
      
      
    return (
      <div className={styles.masterContainer}>
        <div className={styles.container}>
        <div className={styles.filters}>
          <h1 className={styles.filterTitle}>Filters</h1>

          <select onChange={handleData} defaultValue="Gender" name="gender">
            <option defaultValue value="">
              Genre
            </option>
            {uniqueGenres?.map((genre) => {
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
          
          <button
            className={styles.btn}
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
            className={styles.btn}
            type="submit"
            placeholder="Filtrar"
            onClick={() => handleFilter()}
          >Filter price</button>
        </div>

        <div className={styles.bookContainer}>

          {currentBooks === undefined ? <h2 className={styles.noResults}>No results</h2>: <Books currentBooks={allBooks}/>}
          
         <PaginationSearch
          numBooks={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          active={active}
          setActive={setActive}
          body={search}/>
        </div>
        </div>
        
      </div>
    );
  };


export default Results;
