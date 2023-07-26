//import React from 'react';
import { Link } from "react-router-dom";
import styles from "./Book.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  addCart,
  addFavorite,
  getUserById,
  removeCart,
} from "../../redux/actions/actions";

const Book = ({ books }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.access);
  const userDat = useSelector((state) => state.userDetail);

  useEffect(() => { 
    if(user.ref !== "") {
    dispatch(getUserById(user.ref));}
  }, [dispatch, user.ref]);

  const { id, image, title, author, price } = books;

  const [userData, setUserData] = useState(userDat);

  const [isFav, setIsFav] = useState(false);
  const [cart, setCart] = useState(false);

  const genericCover =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhRKhJb1aLmjwGX_ox0TA6eTxCv_5g3Nlr6w&usqp=CAU";

  const handleWishlist = async () => {
    let list;
    if (isFav) {
      setIsFav(false);
      list = userData.listWish.filter((bookF) => bookF.id !== id);
    } else {
      setIsFav(true);
      userData.listWish
        ? (list = [...userData.listWish, books])
        : (list = [books]);
    }
    sendData(list);
  };
  const sendData = (list)=>{
    console.log(userData);
    userData.listWish=list;
    dispatch(addFavorite(userData));

} 
  const handleCart = () => {
    if (cart) {
      setCart(false);
      dispatch(removeCart(books.id));
    } else {
      setCart(true);
      dispatch(addCart(books));
    }
  };

  return (
    <div className={styles.container}>
      {user.state ? (
        isFav ? (
          <button onClick={handleWishlist} className={styles.boton}>
            🧡
          </button>
        ) : (
          <button onClick={handleWishlist} className={styles.boton}>
            🤍
          </button>
        )
      ) : (
        <></>
      )}
      {user.state ? (
        cart ? (
          <button onClick={handleCart} className={styles.boton2}>
            🛒
          </button>
        ) : (
          <button onClick={handleCart} className={styles.boton2}>
            🛍️
          </button>
        )
      ) : (
        <></>
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
