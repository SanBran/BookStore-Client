//import React from "react";
import { useSelector } from "react-redux";
import styles from "./PaymentDetails.module.css";
import { Link } from "react-router-dom";
import MercadoPago from "../../../Components/MercadoPago/MercadoPago";

export const PaymentDetails = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.userDetail);

// Calcula el precio total de los libros en el carrito usando la función reduce
const totalPrice = cart.reduce((total, book) => total + book.price, 0);
  return (
    <div className={styles.container}>
      <div>
        <Link to={`/`}>
          <button>Back</button>
        </Link>
      </div>
      <div>
        <h3>
          You will receive the downloadale file at the following email address.
        </h3>
        <h3>{user.email}</h3>
      </div>
      <div>
        <h3>Payment method</h3>
        <MercadoPago cart={cart} userInfo={user}/>
        <button>Stripe</button>
      </div>
      <div>
        <div>
          <h4>{cart.length} books</h4>
          <h4>${totalPrice}</h4>
        </div>
        <hr></hr>
      </div>
    </div>
  );
};
