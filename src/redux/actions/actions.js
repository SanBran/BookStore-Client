import axios from 'axios';

//Aquí los action Types
export const GET_ALL_BOOKS= 'GET_ALL_BOOKS';
export const GET_BOOKS_BY_TITLE= 'GET_BOOKS_BY_TITLE';

//Y aquí irán los action en sí :)

export function getAllBooks(){
    return async function(dispatch){
        try {
            const response = await axios("http://localhost:8000/getBooks");
return dispatch({type:GET_ALL_BOOKS, payload: response.data})
        } catch (error) {
            throw Error(error.message);
        }
    }
}

export function getBooksByTitle(title){
    return async function(dispatch){
        try{
            console.log(title);
const response = await axios(`http://localhost:8000/getBooks?title=${title}`);
return dispatch({type: GET_BOOKS_BY_TITLE, payload: response.data})
        }catch(error){
throw Error(error.message)
        }
    }
}