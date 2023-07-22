//import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listWish } from "../../redux/actions/actions";
import { overlayProfile } from "../../redux/actions/actions";
import styles from "./Profile.module.css";



//userData={name, birthday, country, phone, phoneCode, gender, email, password, dniPasaport, status, rol, photoUser, listWish}
const Profile = () => {
  const dispatch = useDispatch();
  const showlistWish = useSelector((state) => state.showListwish);
  const showOverlayPerfile = useSelector((state) => state.overlayProfile);

  const handleOverlayToggle = () => {
    dispatch(listWish(!showlistWish));
  };

  const handleCloseOverlayToggle = () => {
    dispatch(overlayProfile(showOverlayPerfile));
    console.log(showOverlayPerfile);
  };
  //! cuando se entra al wislist desde otro compomente ejemplo histoy, el estado queda sin actualizar
  //! si esta en true cuando vuelve al wishlist pasa a false y no se muestra

  return (
    <div className={styles.overlay}>
      <div className={styles.close} onClick={handleCloseOverlayToggle}></div>
      <div className={styles.overlayContent}>
        <div>
          <img width="70" height="70" />
          <h3 style={{ color: "BLACK" }}>Nombre</h3>
          <h5 style={{ color: "BLACK" }}>Email</h5>
        </div>
        <nav>
          <div>
            <Link to="/">
              <button onClick={handleOverlayToggle} type="button">
                Whislist
              </button>
            </Link>
          </div>
          <div>
            <Link to="/history">Pucharse History</Link>
          </div>
          <div>
            <Link to="/settings">Settings</Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Profile;
