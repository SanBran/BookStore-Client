import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { overlayProfile } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import cart_icon from '../../assets/icons/cart_icon.svg';
import profileLogo from "../../sources/profile-user.png";
import Cart from "../../Views/Cart.jsx/Cart";
import { useState } from "react";

const Navbar = () => {
  //const [overlayPerfile,setOverlayPerfile] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showOverlayPerfile = useSelector((state) => state.overlayProfile);
  const access = useSelector((state) => state.access.state);
  const cart = useSelector((state) => state.cart);

  const handleOverlayToggle = () => {
    if (access) {
      dispatch(overlayProfile(showOverlayPerfile));
      console.log(showOverlayPerfile);
    } else {
      navigate("/access");
    }
  };

  const handleBack = () => {
    navigate(-1)
    window.scrollTo(0, 0)
  }


  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <nav className={styles.container}>
      <div>
        <Link to="/">
          <h1 className={styles.logo}>Book Store</h1>
        </Link>
        <button onClick={handleBack}>Atrás</button>
      </div>
      <div className={styles.search}>
        <SearchBar />
      </div>
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
        <img
          className={styles.profile}
          src={profileLogo}
          alt=""
          onClick={handleOverlayToggle}
        />
      </div>
    </nav>
  );
};

export default Navbar;
