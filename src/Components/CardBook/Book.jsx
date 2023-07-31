//import React from 'react';
import fav1 from "../../sources/fav1.png";
import fav2 from "../../sources/fav2.png";
import { Link } from "react-router-dom";
import styles from "./Book.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addCart,
  addFavorite,
  removeCart,
  removeFavorite,
  sendFavorite,
} from "../../redux/actions/actions";

const Book = ({ books }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.access);
  const userInfo = useSelector((state) => state.userDetail);
  const inCart = useSelector((state) => state.cart);
  const favorite = useSelector((state) => state.wishlist);

  const navigate = useNavigate();

  //editUser={id,name, birthday, country, phone, phoneCode, gender, dniPasaport, status, rol, photoUser, listWish}

  const { id, image, title, author, price } = books;
  const [isFav, setIsFav] = useState(false);
  const [cart, setCart] = useState(false);

  const genericCover =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhRKhJb1aLmjwGX_ox0TA6eTxCv_5g3Nlr6w&usqp=CAU";

  const handleWishlist = () => {
    if (user.state) {
      if (isFav) {
        setIsFav(false);
        dispatch(removeFavorite(books.id));
      } else {
        setIsFav(true);
        dispatch(addFavorite(books.id));
      }
      sendData(favorite);
    }
  };
  const sendData = (favorite) => {
    console.log("existe: ", userInfo);
    // Creamos una copia del objeto userData y modificamos su propiedad listWish
    const updatedUserData = { ...userInfo };
    // Modificamos la propiedad listWish de la copia con el nuevo valor
    updatedUserData.listWish = favorite;
    dispatch(sendFavorite(updatedUserData));
    console.log("User: ", updatedUserData);
  };

  const handleCart = () => {
    if (cart) {
      setCart(false);
      dispatch(removeCart(books.id));
    } else {
      setCart(true);
      dispatch(addCart(books));
    }
  };

  const handleToLog = () => {
    navigate("/access");
  };
  useEffect(() => {
    if (user.state) {
      if (userInfo.listWish && userInfo.listWish.includes(id)) {
        setIsFav(true);
      } else {
        setIsFav(false);
      }
    }
  }, [userInfo.listWish, id, user.state]);

  return (
    <div className={styles.container}>
      {user.state ? (
        isFav ? (
          <button onClick={handleWishlist} className={styles.boton}>
            <img src={fav2} alt="" />
          </button>
        ) : (
          <button onClick={handleWishlist} className={styles.boton}>
            <img src={fav1} alt="" />
          </button>
        )
      ) : (
        <button onClick={handleToLog} className={styles.boton}>
          <img src={fav1} alt="" />
        </button>
      )}
      {user.state ? (
        cart ? (
          <button onClick={handleCart} className={styles.boton2s}>
            ✔
          </button>
        ) : (
          <button onClick={handleCart} className={styles.boton2}>
            Add to cart
          </button>
        )
      ) : (
        <button onClick={handleToLog} className={styles.boton2}>
          Add to cart
        </button>
      )}
      <Link className={styles.image} to={`/detail/${id}`}>
        <img
          className={styles.imageSize}
          src={image !== "Image not Available" ? image : genericCover}
          alt={`${title} from ${author}`}
        />
      </Link>

      <div className={styles.textContainer}>
        <div className={styles.title}>{title}</div>
        <div className={styles.author}>{author}</div>
        {price && price ? (
          <div className={styles.price}>${price}</div>
        ) : (
          <div className={styles.price}>Free</div>
        )}
      </div>
    </div>
  );
};

export default Book;
