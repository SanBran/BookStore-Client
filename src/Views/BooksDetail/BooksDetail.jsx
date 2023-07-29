/* eslint-disable no-useless-escape */
import { detailBookById, getBooksByAuthor } from "../../redux/actions/actions"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import styles from './BooksDetail.module.css'
import parseAuthors from "../../utils/parseAuthors"
import removeDuplicateBooks from "../../utils/removeDuplicateBooks"
// import { Link } from "react-router-dom"
import { addCart } from "../../redux/actions/actions"



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
    dispatch(detailBookById(id))
  }, [dispatch, id])



  const book = useSelector(state => state.details)
  const cart = useSelector(state => state.cart)


  useEffect(() => {
    console.log('cart updated: ', cart);
  }, [cart])


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
    <div className={`${styles.container} ${darkMode ? styles.dark : styles.light}`}>
      <button onClick={toggleDarkMode}>Cambiar modo</button>
      <>
        <div className={styles.bookInfo}>
          <img src={book.image} alt={book.title} />
          <div className={styles.bookDetails}>
            <h2>{book.title}</h2>
            <h3>Author</h3>
            {processedAuthor?.map((author, index) => (
              <p key={index}>{author}</p>
            ))}
            <div className={styles.priceAndActions}>
              <p>${book.price}</p>
              <p>PDF format</p>
              <a href="#">BUY NOW</a>
              <button onClick={() => addCart(book)}>ADD TO CART</button>
            </div>
          </div>
        </div>
        <button
          className={showDescription ? styles.activeButton : ''}
          onClick={() => setShowDescription(true)}
        >
          Description
        </button>
        <button
          className={!showDescription ? styles.activeButton : ''}
          onClick={() => setShowDescription(false)}
        >
          Details
        </button>
        <div className={styles.descriptionContainer}>
          <div className={styles.description}>
            {showDescription ? (
              <p>{showDescription && book.sinopsis}</p>
            ) : (
              <div>
                <h3>Language: <span className="spanClean">{book.language}</span></h3>
                <h3>Published date: <span className="spanClean">{book.publishedDate}</span></h3>
                <h3>Editorial :<span className="spanClean">{book.editorial}</span></h3>
                <h3>Gender:</h3>
                {processedGender?.map((gender, index) => (
                  <p key={index}>{gender}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </>
    </div>
  );
}
{/* <div>
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
  </div> */}

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