import {
  UPDATE_CART,
  GET_TOKEN,
  VALIDATE_SESSION,
  LOG_OUT,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  ACTIVATE_USER,
  ACCESS,
  GET_ALL_BOOKS,
  GET_BOOK_BY_AUTHOR,
  GET_BOOK_BY_ID,
  GET_BOOKS_BY_TITLE,
  GET_BOOKS_BY_PRICE,
  POST_BOOK,
  UPDATE_BOOK_BY_ID,
  DELETE_BOOK_BY_ID,
  POST_EMAIL,
  POST_SMS_WHATSAPP,
  FILTER_BY_GENRER,
  FILTER_BY_LANGUAJE,
  SELECT_PAGE,
  SELECT_FILTER_PAGE,
  SELECT_PRICE_PAGE,
  ORDER_BY_PRICE,
  ORDER_BY_PUBLISHED_DATE,
  ORDER_BY_TITLE,
  GET_COMMENTS,
  POST_COMMENT,
  UPDATE_COMMENT_BY_ID,
  DELETE_COMMENT_BY_ID,
  GET_USERS,
  GET_USER_BY_ID,
  DELETE_USERS_BY_ID,
  POST_USER,
  UPDATE_USER,
  OVERLAY_PROFILE,
  SHOW_LISTWISH,
  FILTER_BY_PRICE,
  FILTER_BY_AUTHOR,
  FILTER_BY_GENDER,
  FILTER_BY_LANGUAGE,
  FILTER_BY_EDITORIAL,
  FILTER_BY_NUM_PAGES,
  FILTER_BY_PUBLISHED_DATE,
  FILTER_BY_COUNTRY,
  RESET_BOOKS_BY_AUTHOR,
  FILTER_BY_PriceRange,
  ADD_CART,
  REMOVE_CART,
  PASSWORD_REQUEST,
  PASSWORD_CHANGE,
  REDIRECT_TOKEN,
  GET_GENRES,
  GET_PAYMENTS,
  GET_AUTHORS,
  GET_EDITORIALS,
  GET_COUNTRIES,
  GET_LANGUAGES,
  GET_PUBLISHEDDATES,
  GET_ALL_PAYMENTS,
  GET_TABLEADMIN_BOOKS,
  GET_TABLEADMIN_USERS
} from "../actions/types";

let initialState = {
  access: { state: false, ref: "" },
  allBooks: [],
  allBooksCopy: [],
  booksObject: {},
  allBooksPrice: [],
  priceBooksObject: {},
  genres: [],
  authors: [],
  editorials: [],
  countries: [],
  languages: [],
  publishedDates: [],
  book: [],
  bookByName: [],
  cart: [],
  filteredBooks: [],
  details: [],
  booksByAuthor: [],
  comments: [],
  payments: [],
  allPayments: [],
  response: {},
  error: null,
  users: [],
  userDetail: [],
  overlayProfile: false,
  showListwish: false,
  token: "",
  totalUsers:"",
  totalTableUsers:"",
  tableAdminBooks:[],   // --- GET_TABLEADMIN_BOOKS
  tableAdminUsers:[], //GET_TABLEADMIN_USERS
};

// !Tener el cuenta reducir el reducer en varias partes.
const reducer = (state = initialState, { type, payload }) => {
  let filter;
  switch (type) {
    //-----------------------------BOOK----------------------------------

    case GET_ALL_BOOKS:
      return {
        ...state,
        allBooks: payload.books,
        allBooksCopy: payload.books,
        booksObject: payload.totalPages,
      };
    case GET_BOOKS_BY_TITLE:
      return {
        ...state,
        allBooksCopy: payload.book,
        booksObject: payload.totalPages,
      };
    case GET_BOOKS_BY_PRICE:
      return {
        ...state,
        allBooksPrice: payload.book,
        priceBooksObject: payload.totalPages,
      };
    case GET_BOOK_BY_AUTHOR:
      return {
        ...state,
        booksByAuthor: payload,
      };
    case GET_BOOK_BY_ID:
      return {
        ...state,
        details: payload,
      };
    case RESET_BOOKS_BY_AUTHOR:
      return {
        ...state,
        booksByAuthor: {
          books: [],
        },
      };
    case POST_BOOK:
      return {
        ...state,
        allBooks: [...state.allBooks, payload],
        allBooksCopy: [...state.allBooksCopy, payload],
      };
    case UPDATE_BOOK_BY_ID:
      return {
        ...state,
        allBooks: state.allBooks.map((book) =>
          book.id === payload.id ? payload : book
        ),
        allBooksCopy: [...state.allBooks],
      };
    case DELETE_BOOK_BY_ID:
      return {
        ...state,
        allBooks: state.allBooks.filter((book) => book.id !== payload),
        allBooksCopy: [...state.allBooks],
      };

      case DELETE_USERS_BY_ID:
        return {
          ...state,
          allBooks: state.allBooks.filter((book) => book.id !== payload),
          allBooksCopy: [...state.allBooks],
        };

    //----------------------------FILTERS-------------------
    //case FILTER_BY_GENRER:
    // if (payload === "ALL")
    // return {
    // ...state,
    //allBooksCopy: state.allBooks,
    // };
    // return {
    //  ...state,
    // allBooksCopy: payload,
    // };
    //case FILTER_BY_LANGUAJE:
    // if (payload === "ALL")
    //  return {
    //   ...state,
    //  allBooksCopy: payload,
    //};
    // return {
    // ...state,
    // allBooksCopy: payload,
    //};

    //case FILTER_BY_PUBLISHED_DATE:
    // if (payload === "ALL")
    //  return {
    //   ...state,
    //  allBooksCopy: state.allBooks,
    //};
    // return {
    //  ...state,
    // allBooksCopy: payload,
    // };
    //----------------------------PAGINATION-------------------
    case SELECT_PAGE:
      return {
        ...state,
        allBooks: payload.books,
      };
    case SELECT_FILTER_PAGE:
      return {
        ...state,
        allBooksCopy: payload.book,
      };
    case SELECT_PRICE_PAGE:
      return {
        ...state,
        allBooksPrice: payload.book,
      };
    //----------------------------ORDER-------------------
    case ORDER_BY_PRICE: {
      let orderedBookPrice = [...state.allBooksCopy];
      if (payload === "A") {
        //ascendente mayor
        orderedBookPrice = orderedBookPrice.sort((a, b) => {
          if (a.price > b.price) {
            return 1;
          }
          if (b.price > a.price) {
            return -1;
          }
          return 0;
        });
      } else if (payload === "D") {
        //desendente menor
        orderedBookPrice = orderedBookPrice.sort((a, b) => {
          if (a.price > b.price) {
            return -1;
          }
          if (b.price > a.price) {
            return 1;
          }
          return 0;
        });
      }
      return {
        ...state,
        allBooksCopy: orderedBookPrice,
      };
    }
    case ORDER_BY_TITLE: {
      let orderedBookName = [...state.allBooksCopy];
      if (payload === "A") {
        //ascendente mayor
        orderedBookName = orderedBookName.sort((a, b) => {
          if (a.title > b.title) {
            return 1;
          }
          if (b.title > a.title) {
            return -1;
          }
          return 0;
        });
      } else if (payload === "D") {
        //desendente menor
        orderedBookName = orderedBookName.sort((a, b) => {
          if (a.title > b.title) {
            return -1;
          }
          if (b.title > a.title) {
            return 1;
          }
        });
      }
      return {
        ...state,
        allBooksCopy: orderedBookName,
      };
    }
    case ORDER_BY_PUBLISHED_DATE: {
      let orderedBookPublishedDate = [...state.allBooksCopy];
      if (payload === "A") {
        //ascendente mayor
        orderedBookPublishedDate = orderedBookPublishedDate.sort((a, b) => {
          if (a.publishedDate > b.publishedDate) {
            return 1;
          }
          if (b.publishedDate > a.publishedDate) {
            return -1;
          }
          return 0;
        });
      } else if (payload === "D") {
        //desendente menor
        orderedBookPublishedDate = orderedBookPublishedDate.sort((a, b) => {
          if (a.publishedDate > b.publishedDate) {
            return -1;
          }
          if (b.publishedDate > a.publishedDate) {
            return 1;
          }
        });
      }
      return {
        ...state,
        allBooksCopy: orderedBookPublishedDate,
      };
    }

    //----------------------------BACKEND FILTERS-------------------

    case GET_GENRES:
      return {
        ...state,
        genres: payload,
      };
    case GET_AUTHORS:
      return {
        ...state,
        authors: payload,
      };
    case GET_EDITORIALS:
      return {
        ...state,
        editorials: payload,
      };
    case GET_COUNTRIES:
      return {
        ...state,
        countries: payload,
      };
    case GET_LANGUAGES:
      return {
        ...state,
        languages: payload,
      };
    case GET_PUBLISHEDDATES:
      return {
        ...state,
        publishedDates: payload,
      };

    case FILTER_BY_GENDER:
      if (payload === "") {
        return {
          ...state,
          allBooksCopy: state.allBooks,
        };
      }
      return {
        ...state,
        allBooksCopy: payload,
      };

    case FILTER_BY_AUTHOR:
      if (payload === "") {
        return {
          ...state,
          allBooksCopy: state.allBooks,
        };
      }
      return {
        ...state,
        allBookCopy: payload,
      };

    case FILTER_BY_PRICE:
      if (payload === "") {
        return {
          ...state,
          allBooksCopy: state.allBooks,
        };
      }
      return {
        ...state,
        allBooksCopy: payload,
      };

    case FILTER_BY_LANGUAGE:
      if (payload === "") {
        return {
          ...state,
          allBooksCopy: state.allBooks,
        };
      }
      return {
        ...state,
        allBookCopy: payload,
      };

    case FILTER_BY_EDITORIAL:
      if (payload === "") {
        return {
          ...state,
          allBooksCopy: state.allBooks,
        };
      }
      return {
        ...state,
        allBookCopy: payload,
      };
    case FILTER_BY_PUBLISHED_DATE:
      if (payload === "") {
        return {
          ...state,
          allBooksCopy: state.allBooks,
        };
      }
      return {
        ...state,
        allBooksCopy: payload,
      };
    case FILTER_BY_PriceRange:
      if (payload === "") {
        return {
          ...state,
          allBooksCopy: state.allBooks,
        };
      }
      return {
        ...state,
        allBooksCopy: payload,
      };
    //----------------------------PAYMENTS----------------
    // revisar mercadoPago no estoy seguro como funciona
    case ADD_CART:
      return {
        ...state,
        cart: [...state.cart, payload],
      };
    case UPDATE_CART:
      return {
        ...state,
        cart: payload,
      };
    case REMOVE_CART:
      filter = state.cart.filter((book) => book.id !== payload);
      return {
        ...state,
        cart: filter,
      };
    case GET_PAYMENTS:
      return {
        ...state,
        payments: payload,
        error: null,
      };
    case GET_ALL_PAYMENTS:
      return {
        ...state,
        allPayments: payload,
        error: null,
      };
    //----------------------------WHATSAPP----------------
    case POST_SMS_WHATSAPP:
      return {
        ...state,
        response: payload,
        error: null,
      };
    //----------------------------EMAIL----------------
    case POST_EMAIL:
      return {
        ...state,
        response: payload,
        error: null,
      };
    //----------------------------COMMETS--------------------
    case GET_COMMENTS:
      return {
        ...state,
        comments: payload,
      };
    case POST_COMMENT:
      return {
        ...state,
        comments: [...state.allBooks, payload],
      };
    case UPDATE_COMMENT_BY_ID:
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment.id === payload.id ? payload : comment
        ),
      };
    case DELETE_COMMENT_BY_ID:
      return {
        ...state,
        comments: state.comments.filter((comment) => comment.id !== payload),
      };
    //-----------------------------------------USER--------------------------------

    case ADD_FAVORITE:
      return {
        ...state,
        userDetail: payload,
      };
    case REMOVE_FAVORITE:
      return {
        ...state,
        userDetail: payload,
      };
    case GET_USERS:
      return {
        ...state,
        users: payload.detail,
        totalUsers:payload.detail.totalUsers
      };
    case GET_USER_BY_ID:
      return {
        ...state,
        userDetail: payload.detail,
      };
    case POST_USER:
      return {
        ...state,
        users: [...state.users, payload],
      };
    case ACTIVATE_USER:
      return {
        ...state,
        //por el momento no guarda nada en el estado global
      };
    case UPDATE_USER:
      return {
        ...state,
        userDetail: payload,
      };
    case OVERLAY_PROFILE:
      return {
        ...state,
        overlayProfile: !payload,
      };
    case SHOW_LISTWISH:
      return {
        ...state,
        showListwish: payload,
      };
    case ACCESS:
      return {
        ...state,
        access: payload,
      };
//Esto es para práctica de Google
//case GOOGLE_CONFIRM:
//  return{...state, 
//    //Sin respuesta aparente thanks to searchById
//  }
    case GET_TOKEN:
      return{
        ...state,
        //sin respuesta al estado
      };
    
    case VALIDATE_SESSION:
      return{
        ...state,
        //sin respuesta al estado
      }
    
    case LOG_OUT:
      return{
        ...state,
        userDetail: payload,
      }

    case PASSWORD_REQUEST:
      return {
        ...state,
        //SIN RESPUESTA AL ESTADO
      };

    case PASSWORD_CHANGE:
      return {
        ...state,
        token: "",
      };

    case REDIRECT_TOKEN:
      return {
        ...state,
        token: payload,
      };

      case GET_TABLEADMIN_BOOKS:
        return {
          ...state,
          tableAdminBooks: payload.books,
        };
        case GET_TABLEADMIN_USERS:
          return {
            ...state,
            tableAdminUsers: payload.detail,   
            totalTableUsers:payload.detail.totalUsers
          };
  
    default:
      return { ...state };
  }
};
export default reducer;
