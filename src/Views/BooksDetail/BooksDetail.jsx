/* eslint-disable no-useless-escape */
//import React from 'react'

import { bookByName, detailBookById } from "../../redux/actions/actions"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"


const BooksDetail = () => {
  let processedAuthor = []
  let processedGender = []

  const [showDescription, setShowDescription] = useState(true)
  const book = useSelector(state => state.book)
  console.log(book);
  const { id } = useParams()
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(detailBookById(id))
  }, [dispatch, id])


  if (book.author) {
    const cleanedAuthor = book.author.replace(/[\{\}\"\\]/g, ""); // Eliminar comillas y llaves
    if (cleanedAuthor.includes(",")) {
      processedAuthor = cleanedAuthor.split(",").map(author => author.trim());
    } else {
      processedAuthor = [cleanedAuthor.trim()]; // Convertir en un array de un solo elemento
    }
  }

  if (book.gender) {
    const cleanedGender = book.gender.replace(/[\{\}\"\\]/g, ""); // Eliminar comillas y llaves
    if (cleanedGender.includes(",")) {
      processedGender = cleanedGender.split(",").map(gender => gender.trim());
    } else {
      processedGender = [cleanedGender.trim()]; // Convertir en un array de un solo elemento
    }
  }
  return (
    <>
      {book
        ?
        <>
          <div>
            {<img src={book.image} alt={book.title} />}
            {<h2>{book.title}</h2>}
            <h3>Author</h3>
            {processedAuthor?.map((author, index) => { return <p key={index}>{author}</p> })}



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
            <div>
              <p>${book.price}</p>
              <p>PDF format</p>
              <a href="">BUY NOW</a>
              <button>ADD TO CART</button>
            </div>
          </div>
        </>
        :
        <h3>No detail for this book.</h3>
      }
    </>
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
