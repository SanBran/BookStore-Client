//import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { accessUser, getPayments, getUserById, logOut } from "../../redux/actions/actions";
import { overlayProfile } from "../../redux/actions/actions";
import styles from "./Profile.module.css";
import { useEffect } from "react";

import Cookies from 'js-cookie';


//-----icons
import profile_icon from '../../assets/icons/profile.svg';
import log_out_icon from '../../assets/icons/log_out_icon.svg';
import wishlist_icon from '../../assets/icons/wishlist_fill_icon.svg';
import purchase_history_icon from '../../assets/icons/purchase_history_icon.svg';
import settings_icon from '../../assets/icons/settings_icon.svg';

//userData={name, birthday, country, phone, phoneCode, gender, email, password, dniPasaport, status, rol, photoUser, listWish}
const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showOverlayPerfile = useSelector((state) => state.overlayProfile);
  const userId = useSelector((state) => state.access.ref);
  const user = useSelector((state) => state.userDetail);

  useEffect(() => {
    dispatch(getUserById(userId));
    dispatch(getPayments(userId));
  }, [dispatch, userId]);

  const handleCloseOverlayToggle = () => {
    dispatch(overlayProfile(showOverlayPerfile));
  };
  const handleLogOut = async() => {
    await dispatch(overlayProfile(showOverlayPerfile));
    await dispatch(accessUser(false, ""));
    await dispatch(logOut());
    Cookies.remove('valToken');
    Cookies.remove('email');

    navigate("/");
  };
  //! cuando se entra al wislist desde otro compomente ejemplo histoy, el estado queda sin actualizar
  //! si esta en true cuando vuelve al wishlist pasa a false y no se muestra
  return (
    <div className={styles.overlay}>
      <div className={styles.close} onClick={handleCloseOverlayToggle}>
        <div className={styles.overlayContent}>
          <div className={styles.profileContainer}>
            <img className={styles.profileImg} src={user.photoUser ? user.photoUser : profile_icon} />
            <h3 className={styles.userName}>{user.name}</h3>
            <h5 className={styles.userEmail}>{user.email}</h5>
          </div>
          <nav className={styles.navContainer}>
            <div>
              <Link className={styles.navItem} to="/wishlist">
                <img src={wishlist_icon} alt="❤️" />
                Wishlist
              </Link>
            </div>
            <div>
              <Link className={styles.navItem} to="/history">
                <img src={purchase_history_icon} alt="📜" />
                Pucharse History
              </Link>
            </div>
            <div>
              <Link className={styles.navItem} to="/settings">
                <img src={settings_icon} alt="⚙️" />
                Settings
              </Link>
            </div>
          </nav>
          <div className={styles.Logout} onClick={handleLogOut}>
            {/* <button type="button">
              Log Out
            </button> */}
            <h3 className={styles.LogoutTitle}>Log Out</h3>
            <img src={log_out_icon} alt=">" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
