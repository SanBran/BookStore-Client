import { GET_ALL_BOOKS } from "../actions/actions";
let initialState = {allBooks: []};

const reducer = (state = initialState, action) => {
   switch (action.type) {
     case GET_ALL_BOOKS:
       return {
         ...state,
         allBooks: action.payload
       };
     default:
       return { ...state };
   }
};

export default reducer;
