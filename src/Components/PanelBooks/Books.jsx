//import React from 'react';
import Book from '../CardBook/Book';
const Books= ({allBooks})=>{


return(
    <div>
        <span> There are some Books right here </span>
        {allBooks?.map(book=><Book key={book.id} books={book}/>)}
    </div>
)
}

export default Books;

/* {
   "title": "El candidato de Dios",
    "author": [
      "Luis G. Basurto"
    ],
    "image": "http://books.google.com/books/content?id=vQHmAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
  } */