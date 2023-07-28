// import Stripe from "stripe"
// import axios from "axios";
// import { useEffect, useState } from "react";


// const stripe = new Stripe('sk_test_51NXqBWJvp7x1gGxjTsCAhgScRFFvesnqbhSCoQh5TaTKIplC1acinnXfRefCDS0FvadXBW9cx5l9pjDtdRTd7GFx008SkUSzUD')
// console.log(stripe);
// const customer = await stripe.customers.create({
//     email: 'custoasasdasdasdasdasdasddasdmer@example.com',
// });

// const Cart = () => {
//     const [payLink, setPayLink] = useState('')
//     const payCart = async (data) => {
//         try {
//             const response = await axios.post('http://localhost:8000/create-checkout-session', data)
//             const paymentLink = response.data.url
//             setPayLink(paymentLink)
//             window.open(paymentLink, '_blank')
//         } catch (error) {
//             console.log('Error', error);
//         }
//     }

//     const data = {
//         "items": [{
//             "idBook": "4d3c558e-d17d-4687-a47c-affe1e2d70c6",
//             "name": "Libro n1",
//             "typeMoney": "USD",
//             "price": 1000,
//             "quantity": 1
//         }
//         ],
//         "idBook": "4d3c558e-d17d-4687-a47c-affe1e2d70c6",
//         "user": "Enzo Magurno",
//         "userId": "33b96758-ba03-4d13-b7fd-a384580215b8",
//         "email": "magurnoenzo31602@gmail.com"
//     }
//     return (
//         <>
//             <h1>ESTO ES CARRITO:</h1>
//             <button onClick={() => payCart(data)}>Pagar carrito</button>
//         </>
//     )
// }
// export default Cart
import React, { useEffect, useState } from "react";
//import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Cart.module.css";
import { removeCart } from "../../redux/actions/actions";

//importando icon del boton cerrar
import close_button from "../../assets/icons/close_button.svg";
import delete_icon from "../../assets/icons/delete_icon.svg";



const Cart = ({ isOpen, onRequestClose }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  
  const modalStyles = {
    overlay: {
      backgroundColor: "transparent", // Fondo translúcido oscuro detrás del modal
      zIndex: 100,
    },
  };

  const handleCart = (id)=>{
    dispatch(removeCart(id))
  }

const totalPrice = cart.reduce((total, book) => total + book.price, 0);
  
  return (
    <Modal style={modalStyles} className={styles.modal} isOpen={isOpen} onRequestClose={onRequestClose} >
      <div>
        <div className={styles.titleContainer}>
          <img className={styles.buttonClose} src={close_button} onClick={onRequestClose} alt='x' />
          <h3 className={styles.title}>Your Cart</h3>
        </div>

        <div className={styles.cartContainer}>
          {cart.length !== 0 ? (
            cart.map((book) => (
              <div key={book.id} className={styles.bookContainer}>
                <Link className={styles.bookLink} to={`/detail/${book.id}`}>
                  <img
                    className={styles.bookImage}
                    src={book.image}
                    alt={`${book.title}`}
                  />
                </Link>
                <div className={styles.textContainer}>
                  <div className={styles.bookTitle}>{book.title}</div>
                  {book.price && book.price ? (
                    <div className={styles.bookPrice}>$ {book.price}</div>
                    ) : (
                      <div className={styles.bookPrice}>Free</div>
                      )}
                </div>
                
                <img className={styles.deleteBtn} src={delete_icon} alt="x"  onClick={()=>{handleCart(book.id)}}/>
              </div>
            ))
          ) : (
            <p className={styles.empty}>Empty Cart</p>
          )}
        </div>
        <div className={styles.infoContainer}>
          <h4 className={styles.title}>{cart.length} books</h4>
          <h4 className={styles.price}>${totalPrice}</h4>
        </div>

        <Link to={`/payment`}>
          <button className={styles.buyBtn} onClick={onRequestClose} >Buy Now</button>
        </Link>

            </div>
        </Modal>
    );
};

export default Cart;
