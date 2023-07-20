// datos de los libros 
// title,author,country,language,image,gender,sinopsis
//price,publishedDate,pdfLink,editorial,numPages
export const GET_ALL_BOOKS = 'GET_ALL_BOOKS';
export const GET_BOOK_BY_AUTHOR = "GET_BOOK_BY_AUTHOR";
export const GET_BOOK_BY_ID = "GET_BOOK_BY_ID";
export const GET_BOOKS_BY_TITLE = "GET_BOOK_BY_TITLE";
export const POST_BOOK = "POST_BOOK";
export const UPDATE_BOOK_BY_ID = "UPDATE_BOOK_BY_ID";
export const DELETE_BOOK_BY_ID = "DELETE_BOOK_BY_ID";

// datos de mercadopago
//name,email,IdBook,carrito:[{productId,quantity}],typeMoney,userId
export const POST_MERCADOPAGO = "POST_MERCADOPAGO";
export const POST_WEBHOOK_PAGO = "POST_WEBHOOK_PAGO";
export const GET_FAILURE = "GET_FAILURE";
export const GET_PENDING = "GET_PENDING";
export const GET_SUCCESS = "GET_SUCCESS";

//whatsapp
export const POST_SMS_WHATSAPP = "POST_SMS_WHATSAPP";

//email
//  {mensaje,email, subject, name}
export const POST_EMAIL = "POST_EMAIL";

//FILTER
export const FILTER_BY_GENRER = "FILTER_BY_GENRER";
export const FILTER_BY_AUTHOR_NAME = "FILTER_BY_AUTHOR_NAME";// temporary is used by the searchBar
export const FILTER_BY_TITLE = "FILTER_BY_TITLE";
export const FILTER_BY_LANGUAJE = "FILTER_BY_LANGUAJE";
export const FILTER_BY_PUBLISHED_DATE = "FILTER_BY_PUBLISHED_DATE";

//ORDER
export const ORDER_BY_PRICE = "ORDER_BY_PRICE";
export const ORDER_BY_TITLE = "ORDER_BY_TITLE";
export const ORDER_BY_PUBLISHED_DATE = "ORDER_BY_PUBLISHED_DATE";

//COMMENTS

export const POST_COMMENT = "POST_COMMENT";
export const GET_COMMENTS = "GET_COMMENTS";
export const UPDATE_COMMENT_BY_ID = "UPDATE_COMMENT_BY_ID";
export const DELETE_COMMENT_BY_ID = "DELETE_COMMENT_BY_ID";

//USERS 
export const OVERLAY_PROFILE = "OVERLAY_PROFILE";

export const GET_USERS = "GET_USER";
export const GET_USER_BY_ID = "GET_USER_BY_ID";
export const POST_USER = "POST_USER";
export const UPDATE_USER = "UPDATE_USER";