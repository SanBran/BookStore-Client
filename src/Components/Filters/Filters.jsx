import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks,FilterByGender } from "../../redux/actions/actions";
import "./Filters.css";
import Demo from "./Demo";
import React from "react";
import axios from "axios";

const Filters = () => {
  const Books = useSelector((state) => state.allBooksCopy);
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
    setallBooks(Books);
  }, [Books]);

  console.log("soy el mamalon de los books", allBooks);
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
    //event.preventDefault();

    const sendBody = {
      priceRange: `${priceMin}-${priceMax}`,
    };

    console.log(sendBody);

    const response = await axios.post(
      "http://localhost:8000/getBooks",
      sendBody
    );
    console.log(response.data);
    setBooks(response.data);
  };

  const handleData = (event) => {
    // event.preventDefault();
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });

    // que paso ?
  };

  const handleFilterData = async (event) => {
    const sendBody = {};

    if (data.gender) {
      sendBody.gender = data.gender;
      const filteredBooks = allBooks.filter(
        (Book) => Book.gender === data.gender
      );
      setallBooks(filteredBooks);
      console.log(filteredBooks);
    }

    if (data.editorial) {
      sendBody.editorial = data.editorial;
      const filteredBooks = allBooks.filter(
        (Book) => Book.editorial === data.editorial
      );
      setallBooks(filteredBooks);
      console.log(filteredBooks);
    }
    if (data.publishedDate) {
      sendBody.publishedDate = data.publishedDate;
      const filteredBooks = allBooks.filter(
        (Book) => Book.publishedDate === data.publishedDate
      );
      console.log(filteredBooks);
    }
    if (data.country) {
      sendBody.country = data.country;
      const filteredBooks = allBooks.filter(
        (Book) => Book.country === data.country
      );
      console.log(filteredBooks);
    }
    if (data.language) {
      sendBody.language = data.language;
      const filteredBooks = allBooks.filter(
        (Book) => Book.language === data.language
      );
      console.log(filteredBooks);
    }
    if (data.pages) {
      sendBody.pages = data.pages;
      const filteredBooks = allBooks.filter(
        (Book) => Book.pages === data.pages
      );
      console.log(filteredBooks);
    }

   
    };

     const handleCleanFilter = () => {
      setData({
        gender: "",
        editorial: "",
        publishedDate: "",
        country: "",
        language: "",
        pages: "",
        price: "",
      });
      }
    return (
      <div class="container-principal">
        <div class="filter">
          <h1>Filtros</h1>

          <select onChange={handleData} name="gender">
            <option selected disabled value="gender">
              Gender
            </option>
            {allBooks?.map((Book) => {
              return Book.gender === "Gender not Available" ? null : (
                <option key={Book.id} value={Book.gender}>
                  {Book.gender}
                </option>
              );
            })}
          </select>
          <select onChange={handleData} name="editorial">
            <option selected disabled value="editorial">
              Editorial
            </option>
            {allBooks?.map((Book) => {
              return Book.editorial === "Publisher not available" ? null : (
                <option key={Book.id} value={Book.editorial}>
                  {Book.editorial}
                </option>
              );
            })}
          </select>
          <select onChange={handleData} name="publishedDate">
            <option selected disabled value="publishedDate">
              Published-Date
            </option>
            {allBooks?.map((Book) => {
              return Book.publishedDate === "Publisher not available" ? null : (
                <option key={Book.id} value={Book.publishedDate}>
                  {Book.publishedDate}
                </option>
              );
            })}
          </select>
          <select onChange={handleData} name="country">
            <option selected disabled value="country">
              Country
            </option>
            {allBooks?.map((Book) => {
              return Book.country === "" ? null : (
                <option key={Book.id} value={Book.country}>
                  {Book.country}
                </option>
              );
            })}
          </select>
          <select onChange={handleData} name="language">
            <option selected disabled value="language">
              Language
            </option>
            {allBooks?.map((Book) => {
              return Book.language === "" ? null : (
                <option key={Book.id} value={Book.language}>
                  {Book.language}
                </option>
              );
            })}
          </select>
          <select onChange={handleData} name="pages">
            <option selected disabled value="Pages">
              Pages
            </option>
            {allBooks?.map((Book) => {
              return Book.numPages === 0 ? null : (
                <option key={Book.id} value={Book.numPages}>
                  {Book.numPages}
                </option>
              );
            })}
          </select>
          <select onChange={handleData} name="price">
            <option selected disabled value="Price">
              Price
            </option>
            {allBooks?.map((Book) => {
              return Book.price === 0 ? (
                <option key={Book.id} value={Book.price}>
                  Free
                </option>
              ) : (
                <option key={Book.id} value={Book.price}>
                  {Book.price}
                </option>
              );
            })}
          </select>
          <button
            class="btnFilter"
            type="submit"
            placeholder="Filtrar"
            onClick={() => handleFilterData()}
          />
          <button
            class="btnCleanFilter"
            type="btn"
            placeholder="Limpiar Filters"
            onClick={() => handleCleanFilter()}
          />
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
            class="btnRangePrice"
            type="submit"
            placeholder="Filtrar"
            onClick={() => handleFilter()}
          />
        </div>

        <div class="Books">
          {allBooks?.map((book) => {
            //{ id, title, author, image, price, gender, pages, language, editorial, publicationDate }
            return (
              <Demo
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                image={book.image}
                price={book.price}
                gender={book.gender}
                pages={book.pages}
                language={book.language}
                editorial={book.editorial}
                publicationDate={book.publicationDate}
              />
            );
          })}
        </div>
      </div>
    );
  };


export default Filters;
