/* eslint-disable no-useless-escape */
import { detailBookById, getBooksByAuthor, resetBooksByAuthor } from "../../redux/actions/actions"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import styles from './BooksDetail.module.css'
import parseAuthors from "../../utils/parseAuthors"
import removeDuplicateBooks from "../../utils/removeDuplicateBooks"
import { Link } from "react-router-dom"

const BooksDetail = () => {
  let processedAuthor = []
  let processedGender = []

  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const isDarkModePreferred = JSON.parse(localStorage.getItem('darkMode')) || false;
    setDarkMode(isDarkModePreferred)
  }, [])

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode])


  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };


  const [showDescription, setShowDescription] = useState(true)

  const { id } = useParams()
  const dispatch = useDispatch()
  console.log(id)
  useEffect(() => {
    dispatch(resetBooksByAuthor())
  }, [dispatch, id])


  useEffect(() => {
    dispatch(detailBookById(id))
  }, [dispatch, id])

  const book = useSelector(state => state.details)

  useEffect(() => {
    const authorsArray = parseAuthors(book.author)
    console.log('estos son los papus', authorsArray);
    authorsArray?.forEach(author => {
      dispatch(getBooksByAuthor(author))
    })
  }, [book.author, dispatch])

  const authors = useSelector(state => state.booksByAuthor.books)
  console.log('libros de autores', authors);


  if (book.author) {
    const cleanedAuthor = book.author.replace(/[\{\}\"\\]/g, "");
    if (cleanedAuthor.includes(",")) {
      processedAuthor = cleanedAuthor.split(",").map(author => author.trim());
    } else {
      processedAuthor = [cleanedAuthor.trim()];
    }
  }

  if (book.gender) {
    const cleanedGender = book.gender.replace(/[\{}\"\\]/g, "");
    if (cleanedGender.includes(",")) {
      processedGender = cleanedGender.split(",").map(gender => gender.trim());
    } else {
      processedGender = [cleanedGender.trim()];
    }
  }

  return (
    <div className={darkMode ? 'dark' : 'light'}>
      <button onClick={toggleDarkMode}>Cambiar modo</button>
      {book
        ?
        <>

          <div>
            {<img src={book.image} alt={book.title} />}
            {<h2>{book.title}</h2>}
            <h3>Author</h3>
            {processedAuthor?.map((author, index) => { return <p key={index}>{author}</p> })}
            <div>
              <div>
                <p>${book.price}</p>
                <p>PDF format</p>
                <a href="">BUY NOW</a>
                <button>ADD TO CART</button>
              </div>
            </div>
            <button onClick={() => setShowDescription(true)}>Description</button>

            <button onClick={() => setShowDescription(false)}>Details</button>

            <div>
              {showDescription ?
                <div>
                  <p>{showDescription && book.sinopsis}</p>
                </div>
                :
                <div>
                  <h3>Gender:</h3>
                  {processedGender?.map((gender, index) => <p key={index}>{gender}</p>)}
                  <h3>Language:</h3>
                  <p>{book.language}</p>
                  <h3>Published date:</h3>
                  <p>{book.publishedDate}</p>
                  <h3>Editorial:</h3>
                  <p>{book.editorial}</p>
                </div>
              }
            </div>

          </div>
          <div>
            {authors ? authors?.map(book => {
              <h1>LIBROS DE LOS AUTORES</h1>
              return <Link onClick={() => window.scrollTo(0, 0)} key={book.id} to={`/detail/${book.id}`}>
                <div >
                  <img src={book.image} alt={book.title} />
                  <h4>{book.title}</h4>

                </div>
              </Link>
            }

            ) : <h3>No books relationed with Author</h3>}
          </div>
        </>
        :
        <h3>No detail for this book.</h3>
      }
    </div>
  )
}

export default BooksDetail

/* Que se debe renderizar del libro:
img,
title,
author,
stars,
reviews,
social media,
sinopsis,
price,
other books by the author
*/



/* formato de un libro
{
    "id": "6278209e-2543-4400-94ce-f0e0506d6e83",
    "status": true,
    "title": "El candidato de Dios",
    "author": [
      "Luis G. Basurto"
    ],
    "country": "AR",
    "language": "es",
    "image": "http://books.google.com/books/content?id=vQHmAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    "gender": [
      "Mexican literature"
    ],
    "sinopsis": "Sinopsis not available.",
    "price": 0,
    "publishedDate": "1986",
    "pdfLink": "http://books.google.com.ar/books?id=vQHmAAAAMAAJ&dq=%22%22&hl=&cd=1&source=gbs_api",
    "editorial": "Publisher not available",
    "numPages": 0,
    "userId": null,
    "payId": null
  }
 */