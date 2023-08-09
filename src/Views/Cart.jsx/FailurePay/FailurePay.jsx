import { Link, useNavigate } from "react-router-dom";
import styles from './FailurePay.module.css';

import back_icon from '../../../assets/icons/back_icon.svg';
import short_logo_icon from '../../../assets/icons/short_logo_icon.svg';
import failed_purchase from '../../../assets/icons/failed_purchase.svg';

const FailurePay = () => {
  const navigate = useNavigate();
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
        <img className={styles.messageImg} src={failed_purchase} alt="ok" />
        <div className={styles.textContainer}>
          <h1 className={styles.title}>Failed purchase</h1>
        </div>
      </div>
    </div>
  );
};

export default FailurePay;
