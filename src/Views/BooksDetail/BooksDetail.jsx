/* eslint-disable no-useless-escape */
import { detailBookById, getBooksByAuthor } from "../../redux/actions/actions"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import styles from './BooksDetail.module.css'
import parseAuthors from "../../utils/parseAuthors"
// import { Link } from "react-router-dom"
import { addCart } from "../../redux/actions/actions"
import axios from "axios"


//-----icons
import instagram_icon from '../../assets/icons/instagram_icon.png';
import facebook_icon from '../../assets/icons/facebook_icon.png';
import share_icon from '../../assets/icons/share_icon.svg';

const BooksDetail = () => {
  const genericCover =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhRKhJb1aLmjwGX_ox0TA6eTxCv_5g3Nlr6w&usqp=CAU";


  let processedAuthor = []
  let processedGender = []

  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const isDarkModePreferred = JSON.parse(localStorage.getItem('darkMode')) || false;
    setDarkMode(isDarkModePreferred)
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const [showDescription, setShowDescription] = useState(true)

  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(detailBookById(id))
  }, [dispatch, id])



  const book = useSelector(state => state.details)

  const [autores, setAutores] = useState([])
  console.log('estos son los autores', autores);
  console.log(book);

  useEffect(() => {
    const fetchData = async () => {
      const authorsArray = parseAuthors(book.author);
      console.log('los autores maricoo', authorsArray);
      const promisesArray = authorsArray.map(async (author) => {
        if (author === "Author not Available") {
          return null
        } else {
          const response = await axios.post('https://bookstorepf-production.up.railway.app/getBooks', { "author": author });
          return response.data;
        }
      });

      try {
        const responseDataArray = await Promise.all(promisesArray);
        const filteredDataArray = responseDataArray.filter(data => data !== null);
        setAutores(filteredDataArray);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    }

    fetchData();
  }, [book.author]);



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
      <button className={styles.mode} onClick={toggleDarkMode}>Cambiar modo</button>
      <>
        <div className={styles.bookInfo}>
          <img className={styles.bookImg} src={book.image !== "Image not Available" ? book.image : genericCover} alt={book.title} />
          <div className={styles.bookDetails}>
            <h2 className={styles.title}>{book.title}</h2>
            <div className={styles.authorContainer}>
              <p className={styles.author}>by</p>
              {processedAuthor?.map((author, index) => (
                <p className={styles.author} key={index}>{author}</p>
              ))}
            </div>
            <div className={styles.share}>
              <img className={styles.shareIcon} src={facebook_icon} alt="facebook" />
              <img className={styles.shareIcon} src={instagram_icon} alt="instagram" />
              <img className={styles.shareIcon} src={share_icon} alt="share" />
            </div>
          </div>
          <div className={styles.priceAndActions}>
            <p className={styles.price}>{book.price !== 0 ? `$ ${book.price}` : "Free"}</p>
            <p className={styles.format}>PDF format</p>
            <button className={styles.buyBtn}>BUY NOW</button>
            <button className={styles.cartBtn} onClick={() => { addCart(book) }}>ADD TO CART</button>
          </div>
        </div>
        <div className={styles.descriptionContainer}>

          <div className={styles.switchContainer}>
            <div
              className={showDescription ? styles.switchFocus : styles.switch}
              onClick={() => setShowDescription(true)}
            >
              <h1 className={styles.switchTitle}>Description</h1>
            </div>
            <div
              className={!showDescription ? styles.switchFocus : styles.switch}
              onClick={() => setShowDescription(false)}
            >
              <h1 className={styles.switchTitle}>Details</h1>
            </div>
          </div>

          <div className={styles.textContainer}>
            {showDescription ? (
              <p className={styles.description}>{showDescription && book.sinopsis}</p>
            ) : (
              <div className={styles.details}>
                <div className={styles.detailTextContaiter}>
                  <h3 className={styles.titleDetail}>Language</h3>
                  <h3 className={styles.textDetail}>{book.language}</h3>
                </div>

                <div className={styles.detailTextContaiter}>
                  <h3 className={styles.titleDetail}>Published date</h3>
                  <h3 className={styles.textDetail}>{book.publishedDate}</h3>
                </div>

                <div className={styles.detailTextContaiter}>
                  <h3 className={styles.titleDetail}>Editorial</h3>
                  <h3 className={styles.textDetail}>{book.editorial}</h3>
                </div>

                <div className={styles.detailTextContaiter}>
                  <h3 className={styles.titleDetail}>Gender</h3>
                  <h3 className={styles.textDetail}>
                    {processedGender?.map((gender, index) => (
                      <span key={index}>{gender}</span>
                    ))}
                  </h3>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
      <div>
        {autores ? (
          <>
            <h4>LIBROS DE LOS AUTORES</h4>
            {autores[0]?.book?.map((book) => (
              <Link onClick={() => window.scrollTo(0, 0)} key={book.id} to={`/detail/${book.id}`}>
                <div>
                  <img src={book.image} alt={book.title} />
                  <h4>{book.title}</h4>
                </div>
              </Link>
            ))}
          </>
        ) : (
          <h3>No books related with Author</h3>
        )}
      </div>

    </div>
  );
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