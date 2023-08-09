import styles from './Footer.module.css';

import logo from '../../assets/icons/short_logo_icon.svg';
import { Link } from 'react-router-dom';


const Footer = () => {
    return(
        <div className={styles.footer}>
            <Link className={styles.link} to='/about_us'>About us</Link>
            <img className={styles.logo} src={logo} alt="logo" />
            <Link className={styles.link}
            to="https://instagram.com/book.store.project?utm_source=qr&igshid=ZDc4ODBmNjlmNQ%3D%3D"
            target="_blank"   
            rel="noopener noreferrer">
            Contact</Link>
        </div>
    )
};

export default Footer;