//import React from "react";
import {useSelector } from "react-redux";
import styles from "./PaymentDetails.module.css";
import { useNavigate, useParams } from "react-router-dom";
import MercadoPago from "../../../Components/MercadoPago/MercadoPago";
import Stripe from "../../../Components/Stripe/Stripe";

import short_logo_icon from '../../../assets/icons/short_logo_icon.svg';
import back_icon from '../../../assets/icons/back_icon.svg';
import { useState } from "react";


export const PaymentDetails = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.userDetail);
  const book = useSelector(state => state.details);

  const [seeDetails, setSeeDetails] = useState(false);
  const handleSeeDetails =()=>{
    seeDetails ? setSeeDetails(false) : setSeeDetails(true);
  } ; 

  const { id } = useParams(); // Recupera el ID desde la URL

 // Logica para determinar si se realiza el pago solo para el libro con el ID o para todo el carrito
 const paymentCart = id
 ? [book]
 : cart;

  // Calcula el precio total de los libros en el carrito usando la función reduce
  const totalPrice = paymentCart.reduce((total, book) => total + book.price, 0);

  return (
    <div className={styles.container}>
      
      <div className={styles.backContainer} onClick={()=>{navigate('/')}}>
        <div className={styles.backBtn}>
          <img className={styles.backImg} src={back_icon} alt="<" />
          <h1 className={styles.back}>back</h1>
        </div>
        <img className={styles.logo} src={short_logo_icon} alt="Book Store" />
      </div>

      <div className={styles.emailContainer}>
        <h3 className={styles.emailText}>You will receive the downloadable file at the following email address</h3>
        <h3 className={styles.email}>{user.email}</h3>
      </div>
      <div className={styles.payDetailContainer}>
        <div className={styles.btns}>
          <h3 className={styles.title}>Payment method</h3>
          {/* Solo realizará el pago para el libro con el ID si se proporciona, de lo contrario, usará paymentCart */}
          <MercadoPago 
            styles={styles}
            className={styles.payBtn}
            cart={paymentCart} 
            userInfo={user} 
          />
          <Stripe 
            styles={styles}
            className={styles.payBtn}
            cart={paymentCart} 
            userInfo={user} 
          />

          {/* {id ? (
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
          )} */}
        </div>

        <div className={styles.detailsContainer}>
          <div className={styles.headDetails}>
            <h4 className={styles.nBooks}>{paymentCart.length} books</h4>
            <h4 className={styles.price}>$ {totalPrice}</h4>
          </div>
          <div className={styles.details}>
            <h4 className={styles.seeDetails} onClick={handleSeeDetails}>See details <span>{"↓"}</span></h4>
            <div className={seeDetails ? styles.productsContainer : styles.none}>
              <div className={styles.titleProducts}>
                <h4>Products</h4>
                <h4>Price</h4>
              </div>
                {paymentCart.map((book)=> 
                <div className={styles.products} key={book.id}>
                  <h4>{book.title}</h4>
                  <h4>{book.price > 0 ? `$ ${book.price}` : 'Free'}</h4>
                </div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

