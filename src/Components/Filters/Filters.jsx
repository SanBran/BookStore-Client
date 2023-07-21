import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks } from "../../redux/actions/actions";
import "./Filters.css";
import Demo from "./Demo";
import React from "react";
import axios from "axios";

const Filters = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        Gender: '',
        Price: '',
        Language: '',
        Editorial: '',
        publishedDate: '',
        Pages: '',
        country:''


   });
    const [priceMax, setPriceMax] = useState('');
    const [priceMin, setPriceMin] = useState('');
    const [Books, setBooks] = useState([]);


  

    const fetchBooks = async () => {

        
    try {
      const response = await axios.post("http://localhost:8000/getBooks?page=3" );
      setBooks(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchBooks();
 }, []);


    const handlePriceMin = (event) => {
        event.preventDefault();
        const priceRange  = event.target.value;

        setPriceMin(priceRange)
    }

    const handlePriceMax = (event) => {
        event.preventDefault();
        const priceRange = event.target.value;

        setPriceMax(priceRange)
    }


    const handleFilter = async  (event) => {
        //event.preventDefault();

        const sendBody = {
            priceRange: `${priceMin}-${priceMax}`
        }

        console.log(sendBody)
       


        const response = await axios.post('http://localhost:8000/getBooks', sendBody)
        console.log(response.data)
        setBooks(response.data)

    }

    const handleData = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setData({
            ...data,
            [name]: value
        })


       

    }

    console.log(data)
  return (
    <div class="container-principal">
      <div class="filter">
        <h1>Filtros</h1>

              <select onChange={handleData} name='Gender'>
          <option  selected disabled value="Gender">
            Gender
          </option>
                  {
                      Books.books?.map((Book) => {
                          return (

                              Book.gender === 'Gender not Available' ? null :
                              <option  key={Book.id} value={Book.gender}>{Book.gender}</option>
                          )
                      })
                  }
                 
              </select>
              <select onChange={handleData}  name='Editorial'>
                  <option selected disabled value="Editorial">Editorial</option>
                  {
                      Books.books?.map((Book) => {
                          return (

                              Book.editorial === "Publisher not available" ? null :
                                  <option key={Book.id} value={Book.editorial}>{Book.editorial}</option>
                          )
                      })
                  }


              </select>
              <select onChange={handleData} name='publishedDate'>
                  <option selected disabled value='publishedDate'>Published-Date</option>
                  {
                      Books.books?.map((Book) => {
                          return (

                              Book.publishedDate === "Publisher not available" ? null :
                                  <option  key={Book.id} value={Book.publishedDate}>{Book.publishedDate}</option>
                          )
                      })
                  }
                  

              </select>
              <select onChange={handleData} name='Country'>
                  <option selected disabled value="Country">Country</option>
                  {
                      Books.books?.map((Book) => {
                          return (

                              Book.country === "" ? null :
                                  <option key={Book.id} value={Book.country}>{Book.country}</option>
                          )
                      })
                  }


              </select>
              <select onChange={handleData} name='Language'>
                  <option selected disabled value="Language">Language</option>
                  {
                      Books.books?.map((Book) => {
                          return (

                              Book.language === "" ? null :
                                  <option key={Book.id} value={Book.language}>{Book.language}</option>
                          )
                      })
                  }

              </select>
              <select onChange={handleData} name='Pages'>
                  <option selected disabled value="Pages">Pages</option>
                  {
                      Books.books?.map((Book) => {
                          return (

                              Book.numPages === 0 ? null :
                                  <option key={Book.id} value={Book.numPages}>{Book.numPages}</option>
                          )
                      })
                  }

              </select>
              <select onChange={handleData} name='Price'>
                  <option selected disabled value="Price">Price</option>
                  {
                      Books.books?.map((Book) => {
                          return (

                              Book.price === 0 ? <option key={Book.id} value={Book.price}>Free</option> :
                                  <option key={Book.id} value={Book.price}>{Book.price}</option>
                          )
                      })
                  }


              </select>
              <input name='price' placeholder='Min' value={priceMin} type='text' onChange={handlePriceMin} />
              <input name='price' placeholder='Max' value={priceMax} type='text' onChange={handlePriceMax} />
              <button class='btnRangePrice' type='submit' placeholder='Filtrar' onClick={() => handleFilter() } />

             
      </div>

      <div class="Books">
        {Books.books?.map((book) => {
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
