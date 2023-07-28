//import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Cart.module.css";

//importando icon del boton cerrar
import close_button from "../../assets/icons/close_button.svg"



const Cart = ({ isOpen, onRequestClose }) => {
  const cart = useSelector((state) => state.cart);
  
  const modalStyles = {
    overlay: {
      backgroundColor: "transparent", // Fondo translúcido oscuro detrás del modal
      zIndex: 100,
    },
  //   content: {
  //     width: "25%", // Ajusta el tamaño
  //     height: "445px",
  //     margin: "0 auto", // Centra el modal horizontalmente
  //     top: "50%",
  //     left: "50%",
  //     transform: "translate(-50%, -50%)", // Centra el modal verticalmente
  //   },
  };

const totalPrice = cart.reduce((total, book) => total + book.price, 0);
  
  return (
    <Modal style={modalStyles} className={styles.modal} isOpen={isOpen} onRequestClose={onRequestClose} >
      <div>
        <div className={styles.titleContainer}>
          <img className={styles.buttonClose} src={close_button} onClick={onRequestClose} alt='x' />
          <h3 className={styles.title}>Your Cart</h3>

          {/* <button className={styles.buttonClose} onClick={onRequestClose}>
            X
          </button> */}
        </div>

        {/* <hr></hr> */}
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
            <p className={styles.empty}>Empty Cart</p>
          )}
        </div>
        {/* <hr></hr> */}
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
