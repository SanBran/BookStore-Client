//import React from 'react';
import fav1 from '../../sources/fav1.png'
import fav2 from '../../sources/fav2.png'
import { Link } from "react-router-dom";
import styles from "./Book.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addCart,
  addFavorite,
  getUserById,
  removeCart,
} from "../../redux/actions/actions";


const Book = ({ books, onRemove  }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.access);
  const userDat = useSelector((state) => state.userDetail);
  const inCart = useSelector((state) => state.cart);

  const navigate = useNavigate()


  //editUser={id,name, birthday, country, phone, phoneCode, gender, dniPasaport, status, rol, photoUser, listWish}

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
      list = userData.listWish.filter((idF) => idF !== id);
      onRemove(id);

    } else {
      setIsFav(true);
      userData.listWish ? (list = [...userData.listWish, id]) : (list = [id]);
    }
    sendData(list);
  };
  const sendData = (list) => {
    userData.listWish = list;
    dispatch(addFavorite(userData));
    console.log(userData.listWish);
  };
  useEffect(() => {
    if (user.state) {
      if (userData.listWish && userData.listWish.includes(id)) {
        setIsFav(true);
      } else {
        setIsFav(false);
      }
    }
  }, [userData.listWish, id, user.state]);

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
navigate('/access')  }

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
