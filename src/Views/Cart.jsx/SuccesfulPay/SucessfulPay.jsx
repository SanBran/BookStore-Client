import short_logo_icon from '../../../assets/icons/short_logo_icon.svg';
import back_icon from '../../../assets/icons/back_icon.svg';
import successful_purchase from '../../../assets/icons/successful_purchase.svg';
import { Link, useNavigate } from "react-router-dom";
import styles from './SucessfulPay.module.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateCart } from '../../../redux/actions/actions';

const SucessfulPay = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(updateCart([]))
  },[])
  return (
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
          <h1 className={styles.title}>Successful purchase</h1>
          <h4 className={styles.subtitle}>Go to 
          <span className={styles.underlined} onClick={()=>{navigate('/history')}}>your purchases</span> 
          to download the book</h4> 
        </div>
      </div>
    </div>
  );
};

export default SucessfulPay;
