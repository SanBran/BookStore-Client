import axios from 'axios';

//Aquí los action Types
export const GET_ALL_BOOKS= 'GET_ALL_BOOKS';


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