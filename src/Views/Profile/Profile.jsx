//import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { accessUser, getUserById, listWish } from "../../redux/actions/actions";
import { overlayProfile } from "../../redux/actions/actions";
import styles from "./Profile.module.css";
import { useEffect } from "react";

//userData={name, birthday, country, phone, phoneCode, gender, email, password, dniPasaport, status, rol, photoUser, listWish}
const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showlistWish = useSelector((state) => state.showListwish);
  const showOverlayPerfile = useSelector((state) => state.overlayProfile);
  const userId = useSelector((state) => state.access.ref);
  const user = useSelector((state) => state.userDetail);

  useEffect(() => {
    dispatch(getUserById(userId));
  }, [dispatch, userId]);

  const handleOverlayToggle = () => {
    dispatch(listWish(!showlistWish));
  };

  const handleCloseOverlayToggle = () => {
    dispatch(overlayProfile(showOverlayPerfile));
    console.log(showOverlayPerfile);
  };
  const handleLogOut = () => {
    dispatch(overlayProfile(showOverlayPerfile));
    dispatch(accessUser(false, ""));
    navigate("/");
  };
  //! cuando se entra al wislist desde otro compomente ejemplo histoy, el estado queda sin actualizar
  //! si esta en true cuando vuelve al wishlist pasa a false y no se muestra
  return (
    <div className={styles.overlay}>
      <div onClick={handleCloseOverlayToggle}>
        <div className={styles.overlayContent}>
          <div>
            <img src={user.photoUser} width="70" height="70" />
            <h3 style={{ color: "BLACK" }}>{user.name}</h3>
            <h5 style={{ color: "BLACK" }}>{user.email}</h5>
          </div>
          <nav>
            <div>
              <Link to="/wishlist">Wishlist</Link>
            </div>
            <div>
              <Link to="/history">Pucharse History</Link>
            </div>
            <div>
              <Link to="/settings">Settings</Link>
            </div>
          </nav>
          <div className={styles.Logout}>
            <button onClick={handleLogOut} type="button">
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
