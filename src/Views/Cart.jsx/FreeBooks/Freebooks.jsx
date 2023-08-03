import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Freebooks.module.css";

const SuccessfulAcquisition = () => {
  const [redirect, setRedirect] = useState(false);
  const [contador, setContador] = useState(5);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setRedirect(true);
    }, 5000);

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
        <div class={styles.center}>
          <h1>Adquisición Exitosa en 5 Segundos seras Redirigido al Home 😎 {contador}...</h1>
          <h4>Be attentive to the email to verify the result of the payment</h4>
          <div className="progress-bar" />
        </div>
      )}
    </div>
  );
};

export default SuccessfulAcquisition;
