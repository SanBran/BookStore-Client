import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { overlayProfile } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import profileLogo from "../../sources/profile-user.png";
import Cart from "../../Views/Cart.jsx/Cart";
import { useState } from "react";

const Navbar = () => {
  //const [overlayPerfile,setOverlayPerfile] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showOverlayPerfile = useSelector((state) => state.overlayProfile);
  const access = useSelector((state) => state.access.state);

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

  return (
    <nav className={styles.containerNologo}>
      <div>
        <Link to="/">
          <h1 className={styles.Nologo}>Book Store</h1>
        </Link>
      </div>
      <div className={styles.search}>
        <SearchBar />
      </div>
      {access ? (
        <div className={styles.crearEsteEstilo}>
          <div>
            <button className={styles.noquieroesteboton} onClick={openModal}></button>
            <Cart
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
            />
          </div>
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
