import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Freebooks.module.css";

import successful_purchase from '../../../assets/icons/successful_purchase.svg';
import back_icon from '../../../assets/icons/back_icon.svg';
import short_logo_icon from '../../../assets/icons/short_logo_icon.svg';
import { useDispatch } from "react-redux";
import { updateCart } from "../../../redux/actions/actions";

const SuccessfulAcquisition = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(updateCart([]))
  },[])

  const [redirect, setRedirect] = useState(false);
  const [contador, setContador] = useState(15);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setRedirect(true);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (!redirect && contador > 0) {
      const interval = setInterval(() => {
        setContador((prevContador) => prevContador - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [redirect, contador]);
   console.log(redirect,contador)
  return (
    <div>
      {redirect ? (
       
          
          redirect && window.location.replace("/")
        
      ) : (
      <div className={styles.container}>  
        <div className={styles.backContainer} onClick={()=>{navigate('/')}}>
          <div className={styles.backBtn}>
            <img className={styles.backImg} src={back_icon} alt="<" />
            <h1 className={styles.back}>Back to Home</h1>
            <img className={styles.logo} src={short_logo_icon} alt="Book Store" />
          </div>
        </div>

        <div className={styles.message}>
          <img className={styles.messageImg} src={successful_purchase} alt="ok" />
          <div className={styles.textContainer}>
            <h1 className={styles.title}>Successful acquisition</h1>
            <h4 className={styles.subtitle}>In 5 Seconds you will be Redirected to Home 😎 {contador}...</h4> 
            <h4 className={styles.subtitle}>Be attentive to the email to verify the result of the payment</h4> 
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default SuccessfulAcquisition;
