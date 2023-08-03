import { useNavigate } from "react-router-dom";
import styles from './Security.module.css';
import arrow_icon from '../../../assets/icons/arrow_icon.svg';

function Security() {
  const navigate = useNavigate();

  const onChange = ()=> {
  navigate("/access?requestChangePass=true")
  };

  return (
    <div className={styles.container}>
      <button className={styles.btn} onClick={onChange}>
      Change Password
        <img className={styles.img} src={arrow_icon} alt="x" />
      </button>
    </div>
  );
}

export default Security;
