// datos de los libros
// title,author,country,language,image,gender,sinopsis
//price,publishedDate,pdfLink,editorial,numPages
export const GET_ALL_BOOKS = "GET_ALL_BOOKS";
export const GET_BOOK_BY_AUTHOR = "GET_BOOK_BY_AUTHOR";
export const GET_BOOK_BY_ID = "GET_BOOK_BY_ID";
export const GET_BOOKS_BY_TITLE = "GET_BOOK_BY_TITLE";
export const GET_BOOKS_BY_PRICE = "GET_BOOKS_BY_PRICE";
export const POST_BOOK = "POST_BOOK";
export const UPDATE_BOOK_BY_ID = "UPDATE_BOOK_BY_ID";
export const DELETE_BOOK_BY_ID = "DELETE_BOOK_BY_ID";
export const RESET_BOOKS_BY_AUTHOR = "RESET_BOOKS_BY_AUTHOR";

// PAYMENTS
export const GET_PAYMENTS = "GET_PAYMENTS";
export const GET_ALL_PAYMENTS = "GET_ALL_PAYMENTS";

//whatsapp
export const POST_SMS_WHATSAPP = "POST_SMS_WHATSAPP";

//email
//  {mensaje,email, subject, name}
export const POST_EMAIL = "POST_EMAIL";

//FILTER
export const FILTER_BY_GENRER = "FILTER_BY_GENRER";
export const FILTER_BY_AUTHOR_NAME = "FILTER_BY_AUTHOR_NAME"; // temporary is used by the searchBar
export const FILTER_BY_TITLE = "FILTER_BY_TITLE";
export const FILTER_BY_LANGUAJE = "FILTER_BY_LANGUAJE";
//export const FILTER_BY_PUBLISHED_DATE = "FILTER_BY_PUBLISHED_DATE";

//PAGINATION
export const SELECT_PAGE = "SELECT_PAGE";
export const SELECT_FILTER_PAGE = "SELECT_FILTER_PAGE";
export const SELECT_PRICE_PAGE = "SELECT_PRICE_PAGE";

//ORDER
export const ORDER_BY_PRICE = "ORDER_BY_PRICE";
export const ORDER_BY_TITLE = "ORDER_BY_TITLE";
export const ORDER_BY_PUBLISHED_DATE = "ORDER_BY_PUBLISHED_DATE";

//COMMENTS

export const POST_COMMENT = "POST_COMMENT";
export const GET_COMMENTS = "GET_COMMENTS";
export const UPDATE_COMMENT_BY_ID = "UPDATE_COMMENT_BY_ID";
export const DELETE_COMMENT_BY_ID = "DELETE_COMMENT_BY_ID";

//CART
export const REMOVE_CART = "REMOVE_CART";
export const ADD_CART = "ADD_CART";
export const UPDATE_CART = "UPDATE_CART";

//USERS
export const ACCESS = "ACCESS";
export const GET_TOKEN= "GET_TOKEN";
//export const GOOGLE_CONFIRM ="GOOGLE_CONFIRM";
export const VALIDATE_SESSION = "VALIDATE_SESSION";
export const OVERLAY_PROFILE = "OVERLAY_PROFILE";
export const SHOW_LISTWISH = "SHOW_LISTWISH";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";
export const GET_USERS = "GET_USER";
export const GET_USER_BY_ID = "GET_USER_BY_ID";
export const DELETE_USERS_BY_ID ="DELETE_USERS_BY_ID";
export const POST_USER = "POST_USER";
export const UPDATE_USER = "UPDATE_USER";
export const ACTIVATE_USER = "ACTIVATE_USER";
export const PASSWORD_REQUEST = "PASSWORD_REQUEST";
export const PASSWORD_CHANGE = "PASSWORD_CHANGE";
export const REDIRECT_TOKEN = "REDIRECT_TOKEN";
export const LOG_OUT = "LOG_OUT"

//BACKEND FILTERS
export const FILTER_BY_PRICE = "FILTER_BY_PRICE";
export const FILTER_BY_AUTHOR = "FILTER_BY_AUTHOR";
export const FILTER_BY_GENDER = "FILTER_BY_GENDER";
export const FILTER_BY_LANGUAGE = "FILTER_BY_LANGUAGE";
export const FILTER_BY_EDITORIAL = "FILTER_BY_EDITORIAL";
export const FILTER_BY_NUM_PAGES = "FILTER_BY_NUM_PAGES";
export const FILTER_BY_PUBLISHED_DATE = "FILTER_BY_PUBLISHED_DATE";
export const FILTER_BY_COUNTRY = "FILTER_BY_COUNTRY";
export const FILTER_BY_PriceRange = "FILTER_BY_PriceRange";

//GENRES
export const GET_GENRES = "GET_GENRES";
export const GET_AUTHORS = "GET_AUTHORS";
export const GET_EDITORIALS = "GET_EDITORIALS";
export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_LANGUAGES = "GET_LANGUAGES";
export const GET_PUBLISHEDDATES = "GET_PUBLISHEDDATES";

//ADMIN
export const GET_TABLEADMIN_BOOKS = "GET_TABLEADMIN_BOOKS";
export const GET_TABLEADMIN_USERS = "GET_TABLEADMIN_USERS";
