import styles from './PendingPay.module.css';

import back_icon from '../../../assets/icons/back_icon.svg';
import short_logo_icon from '../../../assets/icons/short_logo_icon.svg';
import pending_payment from '../../../assets/icons/pending_payment.svg';

const PendingPay = () => {
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
        <img className={styles.messageImg} src={pending_payment} alt="ok" />
        <div className={styles.textContainer}>
          <h1 className={styles.title}>Pending purchase</h1>
          <h4 className={styles.subtitle}>Be attentive to the email to verify the result of the payment</h4> 
        </div>
      </div>
    </div>

    // <div>
    //   <div>
    //     <Link to={`/`}>
    //       <button>Back to Home</button>
    //     </Link>
    //   </div>
    //   <h1>Pending payment</h1>
    //   <h4>Be attentive to the email to verify the result of the payment</h4>
    // </div>
  );
};

export default PendingPay;
