import { GET_ALL_BOOKS, GET_BOOKS_BY_TITLE } from "../actions/actions";
let initialState = {allBooks: []};

const reducer = (state = initialState, action) => {
   switch (action.type) {
     case GET_ALL_BOOKS:
       return {
         ...state,
         allBooks: action.payload
       };
      case GET_BOOKS_BY_TITLE:
        return{
          ...state,
          allBooks: action.payload
        };
     default:
       return { ...state };
   }
};

export default reducer;
