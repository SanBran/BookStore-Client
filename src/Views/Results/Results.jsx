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
  
let filterGenre = document.getElementById('genre');
let filterEditorial = document.getElementById('editorial');
let filterPublish = document.getElementById('publish');
let filterCountry = document.getElementById('country');
let filterLanguage = document.getElementById('language');

	


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
    setCurrentPage(1)
    setSearch({
      ...search,
      priceRange: `${priceMin}-${priceMax}`,
    });

   } 

  const handleData = (event) => {
    const { name, value } = event.target;
    if (name === "country" && value === "") {
      delete search.country
      setActive(1)
    }
    if (name === "language" && value === "") {
      
     delete search.language
     setActive(1)
     
    }
    console.log(name, value);
     setSearch({
      ...search,
      [name]: value,
    });
    setActive(1)
    
  };

  const handleDeleteCountry = async () => {
    const updatedSearch = { ...search };
    delete updatedSearch.country;
    setSearch(updatedSearch);
  };

  const handleDeleteLanguage = async () => {
    const updatedSearch = { ...search };
    delete updatedSearch.language;
    setSearch(updatedSearch);
  };

  useEffect(() => {
    const fetchData = async () => {
      // Esperar a que se complete el delete antes de realizar la búsqueda
      if (search.country === "") {
        await handleDeleteCountry();
      }
      if (search.language === "") {
        await handleDeleteLanguage();
      }

      dispatch(getBooksByTitle(search));
      setCurrentPage(1)
      setActive(1)
    };

    fetchData();
  }, [search, dispatch]);

  const handleCleanFilter = () => {
    filterGenre.selectedIndex = 0;
    filterEditorial.selectedIndex = 0;
    filterCountry.selectedIndex = 0;
    filterPublish.selectedIndex = 0;
    filterLanguage.selectedIndex = 0;
      setPriceMin("");
    setPriceMax("");
    setSearch({
      title:origin
    })
    setActive(1)
    setCurrentPage(1)
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

          <select onChange={handleData} defaultValue="Gender" id="genre" name="gender">
            <option defaultValue value="">
              Genre
            </option>
            {uniqueGenres?.map((genre) => {
              return <option key={genre} value={genre}>
              {genre}
            </option>
            })}
          </select>
          <select onChange={handleData} defaultValue="Editorial" id="editorial" name="editorial">
            <option defaultValue value="">
              Editorial
            </option>
            {uniqueEditorial?.map((editorial) => {
              return <option key={editorial} value={editorial}>
              {editorial}
            </option>
            })}
          </select>
          <select onChange={handleData} defaultValue="Published Date" id="publish" name="publishedDate">
            <option defaultValue value="">
              Published-Date
            </option>
            {uniquePublishedDate?.map((date) => {
              return <option key={date} value={date}>
              {date}
            </option>
            })}
          </select>
          <select onChange={handleData} defaultValue="Country" id="country" name="country">
            <option defaultValue value="">
              Country
            </option>
            {uniqueCountry?.map((country) => {
              return <option key={country} value={country}>
              {country}
            </option>
            })}
          </select>
          <select onChange={handleData} defaultValue="Language" id="language" name="language">
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
