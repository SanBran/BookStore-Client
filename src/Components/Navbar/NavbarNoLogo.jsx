import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Navbar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { overlayProfile } from "../../redux/actions/actions";
import cart_icon from '../../assets/icons/cart_icon.svg';
import profileLogo from "../../sources/profile-user.png";
import Cart from "../../Views/Cart.jsx/Cart";
import logo from '../../sources/logo.png'

const Navbar = () => {
  //const [overlayPerfile,setOverlayPerfile] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showOverlayPerfile = useSelector((state) => state.overlayProfile);
  const access = useSelector((state) => state.access.state);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.userDetail);

  const handleOverlayToggle = () => {
    if (access) {
      dispatch(overlayProfile(showOverlayPerfile));
      console.log(showOverlayPerfile);
    } else {
      navigate("/access");
    }
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Opciones: 'auto', 'smooth'
    });
  };

  return (
    <nav className={styles.containerNologo}>
     
      <button onClick={scrollToTop} className={styles.btnlogo}>
        <img className={styles.Nologo} src={logo} alt="logo" />
        </button>
      
      
        <SearchBar />
     
      {access ? (
        <div className={styles.cartContainer}>
          <img className={styles.cartIcon} src={cart_icon} alt="🛒" onClick={openModal} />
          <Cart
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
          />
          {(cart && cart.length !== 0)
            ? (<div className={styles.cartCounter}>{cart.length}</div>)
            : (<></>)}
        </div>
      ) : (
        <></>
      )}
      <div className={styles.profile}>
      <img className={styles.img} onClick={handleOverlayToggle} src={user.photoUser ? user.photoUser : profileLogo} />
        
      </div>
    </nav>
  );
};

export default Navbar;
