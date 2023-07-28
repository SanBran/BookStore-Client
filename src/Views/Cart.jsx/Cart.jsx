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
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Cart.module.css";


const Cart = ({ isOpen, onRequestClose }) => {
    const cart = useSelector((state) => state.cart);
    console.log(cart);

    const modalStyles = {
        overlay: {
            backgroundColor: "transparent", // Fondo translúcido oscuro detrás del modal
        },
        content: {
            width: "25%", // Ajusta el tamaño
            height: "445px",
            margin: "0 auto", // Centra el modal horizontalmente
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)", // Centra el modal verticalmente
        },
    };

    const totalPrice = cart.reduce((total, book) => total + book.price, 0);

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={modalStyles}>
            <div>
                <div className={styles.titleContainer}>
                    <h3>Your Cart</h3>
                    <button className={styles.buttonClose} onClick={onRequestClose}>
                        X
                    </button>
                </div>

                <hr></hr>
                <div className={styles.cartContainer}>
                    {cart.length !== 0 ? (
                        cart.map((book) => (
                            <div key={book.id} className={styles.container}>
                                <Link className={styles.image} to={`/detail/${book.id}`}>
                                    <img
                                        className={styles.imageSize}
                                        src={book.image}
                                        alt={`${book.title}`}
                                    />
                                </Link>
                                <div className={styles.textContainer}>
                                    <div className={styles.title}>{book.title}</div>
                                    {book.price && book.price ? (
                                        <div className={styles.price}>${book.price}</div>
                                    ) : (
                                        <div className={styles.price}>Free</div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Empty Cart</p>
                    )}
                </div>
                <hr></hr>
                <h4>{cart.length} books</h4>
                <h4>${totalPrice}</h4>

                <Link to={`/payment`}>
                    <button onClick={onRequestClose}>Buy Now</button>
                </Link>
            </div>
        </Modal>
    );
};

export default Cart;
