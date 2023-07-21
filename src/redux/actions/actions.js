import axios from 'axios';

//Aquí los action Types
import { GET_ALL_BOOKS, GET_BOOK_BY_AUTHOR, GET_BOOK_BY_ID, GET_BOOKS_BY_TITLE, POST_BOOK, UPDATE_BOOK_BY_ID, DELETE_BOOK_BY_ID, GET_FAILURE, GET_PENDING, GET_SUCCESS, POST_MERCADOPAGO, POST_WEBHOOK_PAGO, POST_EMAIL, POST_SMS_WHATSAPP, FILTER_BY_GENRER, FILTER_BY_LANGUAJE, FILTER_BY_PUBLISHED_DATE, ORDER_BY_PRICE, ORDER_BY_PUBLISHED_DATE, ORDER_BY_TITLE, POST_COMMENT, GET_COMMENTS, UPDATE_COMMENT_BY_ID, DELETE_COMMENT_BY_ID, GET_USERS, GET_USER_BY_ID, POST_USER, UPDATE_USER, OVERLAY_PROFILE } from './types';

//Y aquí irán los action en sí :)
//--------------BOOKS----------   
export function getAllBooks() {
    return async function (dispatch) {
        try {
            const response = await axios.post("http://localhost:8000/getBooks");
            return dispatch({
                type: GET_ALL_BOOKS,
                payload: response.data
            })
        } catch (error) {
            throw Error(error.message);
        }
    }
}
//--------------------FILTERS--------------------
export function getByGenrer(gender) {
    return async function (dispatch) {
        try {
            //console.log(gender);
            const response = await axios.post(`http://localhost:8000/getBooks?gender=${gender}`);
            return dispatch({
                type: FILTER_BY_GENRER,
                payload: response.data
            })
        } catch (error) {
            throw Error(error.message)
        }
    }
}
export function getByLanguaje(languaje) {
    return async function (dispatch) {
        try {
            //console.log(languaje);
            const response = await axios.post(`http://localhost:8000/getBooks?languaje=${languaje}`);
            return dispatch({
                type: FILTER_BY_LANGUAJE,
                payload: response.data
            })
        } catch (error) {
            throw Error(error.message)
        }
    }
}
export function getByPublishedDate(publishedDate) {
    return async function (dispatch) {
        try {
            //console.log(publishedDate);
            const response = await axios.post(`http://localhost:8000/getBooks?publishedDate=${publishedDate}`);
            return dispatch({
                type: FILTER_BY_PUBLISHED_DATE,
                payload: response.data
            })
        } catch (error) {
            throw Error(error.message)
        }
    }
}
export function getBooksByAuthor(author) {
    return async function (dispatch) {
        try {
            //console.log(author);
            const response = await axios.post(`http://localhost:8000/getBooks?author=${author}`);
            return dispatch({
                type: GET_BOOK_BY_AUTHOR,
                payload: response.data
            })
        } catch (error) {
            throw Error(error.message)
        }
    }
}
export function getBooksByTitle(title) {
    return async function (dispatch) {
        try {
            //console.log(title);
            const response = await axios.post(`http://localhost:8000/getBooks?title=${title}`);
            return dispatch({
                type: GET_BOOKS_BY_TITLE,
                payload: response.data
            })
        } catch (error) {
            throw Error(error.message)
        }
    }
}
//----------------------------------------------------------------
export function getBooksById(id) {
    return async function (dispatch) {
        try {
            //console.log(title);
            const response = await axios.post(`http://localhost:8000/getBooks/bookDetail/${id}`);
            return dispatch({
                type: GET_BOOK_BY_ID,
                payload: response.data
            })
        } catch (error) {
            throw Error(error.message)
        }
    }
}
export function postBook(book) {
    return async function (dispatch) {
        try {
            //console.log(title);
            const response = await axios.post(`http://localhost:8000/postBook`, book);
            return dispatch({
                type: POST_BOOK,
                payload: response.data
            })
        } catch (error) {
            throw Error(error.message)
        }
    }
}
export function updateBooksById(id) {
    return async function (dispatch) {
        try {
            //console.log(title);
            const response = await axios.put(`http://localhost:8000/updateBook/${id}`);
            return dispatch({
                type: UPDATE_BOOK_BY_ID,
                payload: response.data
            })
        } catch (error) {
            throw Error(error.message)
        }
    }
}
export function deleteBooksById(id) {
    return async function (dispatch) {
        try {
            //console.log(title);
            const response = await axios.delete(`http://localhost:8000/deleteBook/${id}`);
            return dispatch({
                type: DELETE_BOOK_BY_ID,
                payload: response.data
            })
        } catch (error) {
            throw Error(error.message)
        }
    }
}
//------------------MERCADOPAGO-------------------------------
export function getMercadoPagoFailure() {
    return async function (dispatch) {
        try {
            //console.log(author);
            const response = await axios.get(`http://localhost:8000/failure`);
            return dispatch({
                type: GET_FAILURE,
                payload: response.data
            })
        } catch (error) {
            throw Error(error.message)
        }
    }
}
export function getMercadoPagoSucces() {
    return async function (dispatch) {
        try {
            //console.log(author);
            const response = await axios.get(`http://localhost:8000/succes`);
            return dispatch({
                type: GET_SUCCESS,
                payload: response.data
            })
        } catch (error) {
            throw Error(error.message)
        }
    }
}
export function getMercadoPagoPending() {
    return async function (dispatch) {
        try {
            //console.log(author);
            const response = await axios.get(`http://localhost:8000/pending`);
            return dispatch({
                type: GET_PENDING,
                payload: response.data
            })
        } catch (error) {
            throw Error(error.message)
        }
    }
}
export function postMercadoPago(buyerData) {
    return async function (dispatch) {
        try {
            //console.log(buyerData); 
            // buyerData={name,email,IdBook,carrito,typeMoney,userId}
            //carrito=[{nombre,unit_price,quantity},...]
            const response = await axios.post(`http://localhost:8000/mercadoPago`, buyerData);
            return dispatch({
                type: POST_MERCADOPAGO,
                payload: response.data
            })
        } catch (error) {
            throw Error(error.message)
        }
    }
}
export function postWebhookPago(payment) {
    return async function (dispatch) {
        try {

            const response = await axios.post(`http://localhost:8000/webhook-pago?payment=${payment}`);
            return dispatch({
                type: POST_WEBHOOK_PAGO,
                payload: response.data
            })
        } catch (error) {
            throw Error(error.message)
        }
    }
}
//--------------------EMAIL------------------------
// dataEmail= {mensaje,email, subject, name}
export function postEmail(dataEmail) {
    return async function (dispatch) {
        try {
            const response = await axios.post(`http://localhost:8000/sendEmail`, dataEmail);
            return dispatch({
                type: POST_EMAIL,
                payload: response.data
            })
        } catch (error) {
            throw Error(error.message)
        }
    }
}
//--------------------WHATSAPP--------------------
// dataSms = {message, sender}
export function postSmsWhatsapp(dataSms) {
    return async function (dispatch) {
        try {
            const response = await axios.post(`http://localhost:8000/SMS-Whatsapp`, dataSms);
            return dispatch({
                type: POST_SMS_WHATSAPP,
                payload: response.data
            })
        } catch (error) {
            throw Error(error.message)
        }
    }
}
//--------------------ORDER BY--------------------
export function orderByPrice(order) {
    return {
        type: ORDER_BY_PRICE,
        payload: order
    }
}
export function orderByTitle(order) {
    return {
        type: ORDER_BY_TITLE,
        payload: order
    }
}
export function orderByPublishedDate(order) {
    return {
        type: ORDER_BY_PUBLISHED_DATE,
        payload: order
    }
}
//--------------------COMMETS--------------------

export function getComents() {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:8000/getComments`);
            return dispatch({
                type: GET_COMMENTS,
                payload: response.data
            })
        } catch (error) {
            throw Error(error.message)
        }
    }
}
//comment= {rating, comment, bookId, userId}
export function postComment(comment) {
    return async function (dispatch) {
        try {
            //console.log(comment);
            const response = await axios.post(`http://localhost:8000/postComment`, comment);
            return dispatch({
                type: POST_COMMENT,
                payload: response.data
            })
        } catch (error) {
            throw Error(error.message)
        }
    }
}
//editCommet={id, rating, comment }
export function updateCommentById({ id, rating, comment }) {
    return async function (dispatch) {
        try {
            //console.log(id, rating, comment);
            const response = await axios.put(`http://localhost:8000/updateComment/${id}`, rating, comment);
            return dispatch({
                type: UPDATE_COMMENT_BY_ID,
                payload: response.data
            })
        } catch (error) {
            throw Error(error.message)
        }
    }
}
export function deleteCommentById(id) {
    return async function (dispatch) {
        try {
            //console.log(id);
            const response = await axios.delete(`http://localhost:8000/deleteComment/${id}`);
            return dispatch({
                type: DELETE_COMMENT_BY_ID,
                payload: response.data
            })
        } catch (error) {
            throw Error(error.message)
        }
    }
}
//-------------------------USER-----------------------

export function overlayProfile(bool) {
    
    return {
        type: OVERLAY_PROFILE,
        payload: bool
    }
}
export function getUsers() {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:8000/findUser`);
            console.log(response.data.detail);
            return dispatch({
                type: GET_USERS,
                payload: response.data
            })
        } catch (error) {
            throw Error(error.message)
        }
    }
}
export function getUserById(id) {
    return async function (dispatch) {
        try {
            //console.log(title);
            const response = await axios.get(`http://localhost:8000/getBooks/findUser/${id}`);
            return dispatch({
                type: GET_USER_BY_ID,
                payload: response.data
            })
        } catch (error) {
            throw Error(error.message)
        }
    }
}
//userData={name, birthday, country, phone, phoneCode, gender, email, password, dniPasaport, status, rol, photoUser, listWish}
export function postUser(userData) {
    return async function (dispatch) {
        try {
            //console.log(userData);
            const response = await axios.post(`http://localhost:8000/newUser`, userData);
            return dispatch({
                type: POST_USER,
                payload: response.data
            })
        } catch (error) {
            throw Error(error.message)
        }
    }
}
//editCommet={id, rating, comment }
export function updateUser(userData) {
    return async function (dispatch) {
        try {
            //console.log(userData);
            const response = await axios.put(`http://localhost:8000/updUser`, userData);
            return dispatch({
                type: UPDATE_USER,
                payload: response.data
            })
        } catch (error) {
            throw Error(error.message)
        }
    }
}
