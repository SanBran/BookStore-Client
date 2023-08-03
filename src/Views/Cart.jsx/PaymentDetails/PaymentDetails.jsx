//import React from "react";
import {useSelector } from "react-redux";
import styles from "./PaymentDetails.module.css";
import { Link, useParams } from "react-router-dom";
import MercadoPago from "../../../Components/MercadoPago/MercadoPago";
import Stripe from "../../../Components/Stripe/Stripe";


export const PaymentDetails = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.userDetail);
  const book = useSelector(state => state.details)

  const { id } = useParams(); // Recupera el ID desde la URL

 // Logica para determinar si se realiza el pago solo para el libro con el ID o para todo el carrito
 const paymentCart = id
 ? [book]
 : cart;

  // Calcula el precio total de los libros en el carrito usando la función reduce
  const totalPrice = cart.reduce((total, book) => total + book.price, 0);

  return (
    <div className={styles.container}>
      <div>
        <Link to={`/`}>
          <button className={styles.Back}>Back</button>
        </Link>
      </div>
      <div>
        <h3>
          Thank you for your purchase! You will receive the downloadable file at
          the following email address:
        </h3>
        <h3>{user.email}</h3>
        <h3>Choose your preferred payment method:</h3>
      </div>
      <div className={styles.btns}>
        {/* Solo realizará el pago para el libro con el ID si se proporciona, de lo contrario, usará paymentCart */}
        {id ? (
          <>
            <MercadoPago
              cart={paymentCart}
              userInfo={user}
              styles={styles}
            />
            <Stripe cart={paymentCart} userInfo={user} styles={styles} />
          </>
        ) : (
          <>
            <MercadoPago cart={paymentCart} userInfo={user} styles={styles} />
            <Stripe cart={paymentCart} userInfo={user} styles={styles} />
          </>
        )}
      </div>
      <div>
        <div>
          <h4>You have purchased {paymentCart.length} books</h4>
          <h4>Total Price: ${totalPrice}</h4>
        </div>
        <hr />
      </div>
    </div>
  );
};

